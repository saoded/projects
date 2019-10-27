#include <stdio.h>
#include <stdlib.h>

int** matMultiplyer (int** mat1 , int** mat2 , int r1 , int c1 , int r2 , int c2){
    
    int** ans;
    ans = (int**) malloc (r1 * sizeof (int));
    for (int i=0 ; i<r1 ; i++){
        ans[i] = (int*)malloc(c2 * sizeof(int));
        for(int k=0 ; k< c2 ; k++){
            ans [i][k] = 0;
        }
    }

    if (c1 != r2){
        return ans;
    }
    
    for (int i=0 ; i<r1 ; i++){
        for (int h=0 ; h<c2 ; h++){
            
            for (int d=0 ; d<c1 ; d++){
                ans[i][h] += (mat1[i][d] * mat2[d][h]);
            }
        }
    }
    
    return ans;
}




int main(){
    int r1 = 3;
    int d = 2;
    int c2 = 4;
    int count = 0;
    
    int** m1 = (int**)malloc(r1 * sizeof(int*));
        for(int i=0 ; i<r1 ; ++i){
            m1[i] = (int*)malloc(d * sizeof(int));
            for(int j=0 ; j<d ; ++j)
                m1[i][j] = ++count;
        }
    int** m2 = (int**)malloc(d * sizeof(int*));
        for(int i=0 ; i<d ; ++i){
            m2[i] = (int*)malloc(c2 * sizeof(int));
            for(int j=0 ; j<c2 ; ++j)
                m2[i][j] = ++count;
        }
    
    int** res = matMultiplyer((int**)m1,(int**)m2, r1, d, d, c2);
    
    for (int i=0 ; i<r1 ; i++){
        for (int h=0 ; h<d ; h++){
            printf("%d\t" , m1[i][h]);
        }
        printf("\n");
        free(m1[i]);
    }
    free(m1);
    printf("\n\n");
    
    for (int i=0 ; i<d ; i++){
        for (int h=0 ; h<c2 ; h++){
            printf("%d\t" , m2[i][h]);
        }
        printf("\n");
        free(m2[i]);
    }
    free(m2);
    printf("\n\n");
    
    for (int i=0 ; i<r1 ; i++){
        for (int h=0 ; h<c2 ; h++){
            printf("%d\t" , res[i][h]);
        }
        printf("\n");
        free(res[i]);
    }
    free(res);
    
    return 0;
}