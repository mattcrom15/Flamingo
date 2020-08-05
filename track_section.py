"""track elements
set list, true or false, order number
trackname - string
content status - Waiting to start, Concept stage, Production, ready for D3, completed
pending review - pr 0 = false 1 =true
progress - int 0-100%

"""

status = ["Waiting to start", "Concept stage", "Production", "Ready for D3", "Completed"]


class track_section:

    def __init__(self,trackname):
        self.trackname = trackname
        self.status = status[0]
        self.progress = 0
        self.pr = 0

        

    #return progress

    def get_progress(self):
        c = self.status
        if c == "Waiting to start":
            return 0
        elif c == "Concept stage":
            return 25
        elif c == "Production":
            return 50
        elif c == "Ready for D3":
            return 75
        else:
            return 100
    ### set progress
    def set_progress(self,i):
        p = self.status = status[i]
        self.pr = 1
        return p



def get_progress(status):
    c = status
    if c == "Waiting to start":
        return 0
    elif c == "Concept stage":
        return 25
    elif c == "Production":
        return 50
    elif c == "Ready for D3":
        return 75
    else:
        return 100