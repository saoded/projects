import numpy as np
import sympy as sm
import matplotlib.pyplot as plt


def sys_from_potential(pot):
    global x
    return sm.Matrix(list(map(lambda xi: sm.diff(pot, xi), x)))


def calculate_equilibria(sys):
    global x
    eqs = list(map(lambda dxi: sm.Eq(dxi, 0), sys))
    print(eqs)
    equilibria = sm.solve(eqs, x)
    if type(equilibria) is dict:
        equilibria = [(equilibria[x1], equilibria[x2])]
    print("All equilibria (including complex)")
    print(equilibria)
    return equilibria


def filter_real_points(points):
    points = [point for point in points if all(
        coordinate.is_real for coordinate in point)]
    return points


def linearize(sys, points):
    global x
    if points == []:
        print("nothing to linearize around!")
        return []
    n = len(sys)
    A = sys.jacobian(x)
    print("Jacobian:")
    print(A)
    As = list(map(lambda p: A.subs([(x[i], p[i]) for i in range(n)]), points))
    return As


def determine_stability(As):
    print("eigen values:")
    eigs = [A.eigenvals() for A in As]
    print(eigs)
    isStable = [all(eig.is_real for eig in A.eigenvals().keys()) for A in As]
    return isStable


def draw_nullclines(sys, x1_start=-1, x1_end=1, x2_start=-1, x2_end=1):
    global x
    # solutions = list(map(lambda dx: sm.solve(sm.Eq(dx, 0)), sys))
    solutions = [sm.solve(sm.Eq(dx, 0)) for dx in sys]
    print("solutions:")
    print(solutions)
    # solutions is an annoying data structure. It's a list with N sublists (when N is the dimention)
    # each sublist is composed of M 1-element dictionaries, when M is the number of nullclines for the respective coordinate
    # each dictionary has one key, which is the solving coordinate, and one value, which is the slution using this coordinate.
    # e.g. if x1=log(x2) || x2=x1^2 solves x1's equation, and x1=2 || x1=-2 solves x2's equation, then solutions will be:
    # [[{x1: log(x2)}, {x2: x1**2}], [{x1: 2}, {x1: -2}]]
    for i in range(len(solutions)):
        c = 'b' if i==0 else 'r'
        for solution in solutions[i]:
            sm.plot_implicit(sm.Eq(list(solution.keys())[0],list(solution.values())[0]), line_color=c)
    # sm.plot_implicit(sm.Eq(x1, 2), color='b')
    # plt.show()


def force_system_to_contain_all_coordinates(sys):
    global x
    for xi in x:
        for iEq in range(len(sys)):
            if xi not in sys[iEq].free_symbols:
                sys[iEq] += xi - sm.log(sm.exp(xi))


# sm.var('x1 x2')
x1, x2 = sm.symbols('x1 x2')
# a1, a2 = sm.symbols('a1 a2')
x = [x1, x2]
V = x1 * x1 + x2 * x2
print(sys_from_potential(V))

sys = sm.Matrix([-4 * x1 + x2*x2,
                 5 * (sm.exp(x1 - x2) - 1)])
force_system_to_contain_all_coordinates(sys)
equilibria = filter_real_points(calculate_equilibria(sys))
print("real equilibria:")
print(equilibria)
'''
for equilibrium in equilibria:
    print("( ", end='')
    for coordinate in equilibrium:
        print(sm.nsimplify(coordinate, tolerance=1e-3), end=' ')
    print(")")
'''
As = linearize(sys, equilibria)
print("Linearized:")
As = list(map(lambda A: sm.simplify(A), As))
for A in As:
    print(A)
isStable = determine_stability(As)
print("Determine Stability:")
print(isStable)
draw_nullclines(sys)
