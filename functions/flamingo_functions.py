### main functions for extra bits eg file upload/downloads

###imports
import os
import csv
import base64
import json
from PIL import Image


###upload track photo

def create_track_photos(img,path,id,trackname):
    tid = id
    trackname = trackname
    imgdata = base64.b64decode(img)
    #build output paths
    coverphoto_name = str(tid) + '_' +  trackname + '_'+ 'cover.png'
    cp_out = os.path.join(path,coverphoto_name)
    with open(cp_out, 'wb') as f:
        f.write(imgdata)
    print('Track Photos created!')
    return coverphoto_name



#txt file convert
def txtFile(filename):
    tracks = []
    with open(filename,'r') as f:
        lines = f.readlines()
        for line in lines:
            tracks.append(line)
    return tracks

##csv convert
def csvFile(filename):
    pass

### track_from_file
def track_from_file(file):
    _, ext = file.split('.')

    if ext == 'txt':
        txtFile(file)
    else:
        csvFile(file)
