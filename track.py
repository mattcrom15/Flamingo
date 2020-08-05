
"""track elements
set list, true or false, order number
trackname - string
priority - low, medium, high - deadline date
content status - Waiting to start, Concept stage, Production, ready for D3, completed
Pending review - True or false
IMAG- D3, Notch complete status
Assigned to - users
Audio - true or false
progress - int 0-100%

"""


import os

"""properties"""

trackid = 0
priority = ["Low", "Medium", "High"]
status = ["Waiting to start", "Concept stage", "Production", "ready for D3", "completed"]
pending = 0
assigned = "Nobody assigned"
audio = 0
progress = 0


#track class


class track:

    def __init__(self,trackname):
        self.trackid = trackid
        self.trackname = trackname
        self.priority = priority[0]
        self.status = status[0]
        self.pending = pending
        self.assigned = assigned
        self.audio = audio
        self.progress = progress
        self.desc = 'No Track Description.'
        self.tracklength = '0:00:00:00'

    #updates priority
    def update_priority(self,p,):
        self.priority = priority[p]

    #updates status
    def update_status(self,s):
        self.status = status[s]

    #updates_pending
    def update_pending(self,pe):
        self.pending = pending[pe]

    #updates_assigned
    def update_assigned(self,ass):
        self.assigned = assigned[ass]

    #updates_audio
    def update_audio(self,aud):
        self.audio = audio[aud]

    #updates_audio
    def update_progress(self,pr,):
        self.progress = progress[pr]

#create track instance
def create_track(name):
    t = track(name)
    return t

#basic edit track

def edit_track(p,s):
    nt.update_track(p,s)

