#include<stdio.h>
#include<stdlib.h>
#include<math.h>

void printArray(int* arr, int l){
    for(int i=0 ; i<l ; ++i)
        printf("%d\t", arr[i]);
    printf("\n\n");
}

int findMax(int* arr, int l){
    int arrMax = arr[0];
    for(int i=1 ; i<l ; ++i)
        if(arrMax < arr[i])
            arrMax = arr[i];
    return arrMax;
}

int isDivisorInArray(int* arr, int l, int n){
    int boundry = sqrt(n)+1;
    if(l < boundry)
        boundry = l;
    for(int i=0 ; i<boundry ; ++i)
        if(!(n % arr[i]))
            return 1;
    return 0;
}

int* getPrimesUpTo(int n){    
    int count=1, *upToN, *primes;
    if(n < 2){
        primes = (int*)malloc(sizeof(int));
        primes[0] = -1;
        return primes;
    }
    
    upToN = (int*)malloc((n+1) * sizeof(int));
    upToN[0] = 2;
    for(int i=3 ; i<=n ; ++i)
        if(!isDivisorInArray(upToN, count, i))
            upToN[count++] = i;
    
    primes = (int*)malloc((count+1)*sizeof(int));
    for(int i=0 ; i<count ; ++i)
        primes[i] = upToN[i];
    primes[count] = -1;
    free(upToN);
    return primes;
}

int getSpecialArrayLen(int* arr){
    int len = 0;
    while(arr[len] != -1)
        ++len;
    return len;
}
/*
int isNumInArray(int* arr, int l, int n){
    for(int i=0 ; i<l ; ++i)
        if(arr[i] == n)
            return 1;
    return 0;
}

int isNumInSortedArray(int* arr, int l, int n){
    int start = 0;
    int end = l-1;
    int mid;
    while(end >= start){
        mid = start + ((end - start) / 2);
        if(arr[mid] == n)
            return 1;
        if(arr[mid] > n)
            end = mid - 1;
        else
            start = mid + 1;
    }
    return 0;
}
*/
int isNumInSortedArrayRec(int* arr, int l, int n){
    //printArray(arr, l);
    if(l==0)
        return 0;
    int mid = l/2;
    if(arr[mid] == n)
        return 1;
    if(arr[mid] > n)
        return isNumInSortedArrayRec(arr, mid, n);
    return isNumInSortedArrayRec(arr+mid+1, (l-1)/2, n);
}

void primePrinter(int* arr, int l){
    printf("max = %d\n", findMax(arr, l));
    int boundry = sqrt(findMax(arr, l));
    printf("sqrt(max) = %d\n", boundry);
    int* primes = getPrimesUpTo(boundry);
    int nPrimes = getSpecialArrayLen(primes);
    //boundry = primes[nPrimes-1];
    printf("\nprime array:\n");
    printArray(primes, nPrimes);
    printf("primes in original array:\n");
    for(int i=0 ; i<l ; ++i){
        if(arr[i] <= boundry){
            //if(isNumInArray(primes, nPrimes, arr[i]))
            //if(isNumInSortedArray(primes, nPrimes, arr[i]))
            if(isNumInSortedArrayRec(primes, nPrimes, arr[i]))
                printf("%d\t", arr[i]);
            }
        else
            if(!isDivisorInArray(primes, nPrimes, arr[i]))
                printf("%d\t", arr[i]);
    }
    printf("\n\n");
    free(primes);
}

int main(){
    int len = 7;
    int a[7] = {1, 2, 3, 4, 7, 11, 49};
    //printf("\ncheck recursion: %d\n",isNumInSortedArrayRec(a, 7, 2));

    printf("\noriginal array:\n");
    printArray(a, len);
    primePrinter(a, len);
    
    return 0;
}