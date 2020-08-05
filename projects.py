"""projects

artist name
tour
number of tracks
progress


"""

from datetime import date
from date_convert import convert_date

today = date.today()
d = convert_date(str(today))


#set up new track going to correct folder

class Projects:
    """creates new project based on 'Artist name' and 'Tour name' inputs """

    def __init__(self, artist, tour):
        self.artist = artist
        self.tour = tour
        self.totaltracks = 0
        self.completed = 0
        self.progress = 0
        self.deadline = d
        self.resolution = '1024x1024'
        self.framerate = '25'
        self.contentmap = 'Not set'


#create project function

def create_project(artist,tour):
    project = Projects(artist,tour)
    return project

#create project(for button)






