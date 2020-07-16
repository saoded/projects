import interview_task
from datetime import datetime, timedelta
from pause import until


def selectors_unit_test():
    for i in range(0, 10):
        print(interview_task.selectors(i))


def detector_unit_test():
    print("\nALL FRAMES SHOULD BE VALID")
    detector_passing_unit_test()
    print("\nVALID RATE SHOULD BE EXCEEDED, DATA IS ZERO (3rd frame invalid)")
    detector_rate_unit_test()
    print("\nLENGTH IS CONSTANT, 2nd DATA BYTE ON 1st FRAME IS 1st DATA BYTE ON 2nd FRAME")
    detector_length_unit_test()

def detector_passing_unit_test():
    interview_task.sys_reset()
    last_gen_time = datetime.now()

    for i in range(1,4):
        # print(interview_task.FRAME_META[0x100].timestamp)
        frame = interview_task.frame_constructor(0x100*i, 0, 0)
        # print(bin(frame))
        last_gen_time += timedelta(milliseconds=85)
        until(last_gen_time)  # REQUIRES PYTHON 3
        # SEND FRAME
        interview_task.report(interview_task.detect_can_frame(frame))


def detector_rate_unit_test():
    interview_task.sys_reset()
    last_gen_time = datetime.now()

    for i in range(3):
        # print(interview_task.FRAME_META[0x100].timestamp)
        frame = interview_task.frame_constructor(0x100, i, 0)
        # print(bin(frame))
        last_gen_time += timedelta(milliseconds=85)
        until(last_gen_time)  # REQUIRES PYTHON 3
        # SEND FRAME
        interview_task.report(interview_task.detect_can_frame(frame))


def detector_length_unit_test():
    interview_task.sys_reset()
    last_gen_time = datetime.now()

    for i in range(1,4):
        # print(interview_task.FRAME_META[0x100].timestamp)
        frame = interview_task.frame_constructor(0x200, 3, 0x010205 * i)
        # print(bin(frame))
        last_gen_time += timedelta(milliseconds=101)
        until(last_gen_time)  # REQUIRES PYTHON 3
        # SEND FRAME
        interview_task.report(interview_task.detect_can_frame(frame))

# selectors_unit_test()
detector_unit_test()
