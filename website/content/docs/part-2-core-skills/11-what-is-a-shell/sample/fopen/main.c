#include <stdio.h>
#include <stdlib.h>

int main()
{
    FILE* file = fopen("/tmp/file.txt", "rw");
    fprintf(file, "Goodbye, Cruel World!");
    fclose(file);
    return 0;
}
