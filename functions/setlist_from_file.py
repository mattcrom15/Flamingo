import os
import csv
#txt file convert
def txtFile(filename):
    with open(filename,'r') as f:
        lines = f.readlines()
        for line in lines:
            print(line)
    return 'text file converted to tracks'

def csvFile(filename):
    pass


filename = '/home/mattcromwell/Documents/ES-setlist.txt'

name, ext = filename.split('.')
print(ext)

if ext == 'txt':
    txtFile(filename)
else:
    csvFile(filename)
