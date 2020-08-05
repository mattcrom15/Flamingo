from projects import create_project
from track import create_track
from track_section import track_section, get_progress
import sqlite3
import os
from config import client_uploads

db = 'flamingo.db'

#conn = sqlite3.connect('flamingo.db')
#c = conn.cursor()

'''creates a artist and tour. stores inside database'''

def create_show(artist,tour):
    numzero = 0
    conn = sqlite3.connect(db)
    c = conn.cursor()
    p = create_project(artist,tour)
    c.execute(" INSERT INTO artists VALUES (null, :name, :tour, :totaltracks, :completed, :progress,:deadline,:resolution,:framerate)", {'name': p.artist,
                                                                                                        'tour': p.tour,
                                                                                                        'totaltracks':numzero,
                                                                                                        'completed': numzero,
                                                                                                        'progress': numzero,
                                                                                                        'deadline':p.deadline,
                                                                                                        'resolution':p.resolution,
                                                                                                        'framerate':p.framerate})

    conn.commit()
    c.close()
    conn.close()
    return p


'''artist functions'''
def all_artist_tour():
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT * FROM artists")
    conn.commit()
    return c.fetchall()

def all_artists():
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT artistname FROM artists")
    conn.commit()
    return c.fetchall()

def all_tours():
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT tourname FROM artists")
    conn.commit()
    return c.fetchall()

def artist(artistid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    i = str(artistid)
    c.execute("SELECT artistname FROM artists WHERE artistid=(?)", [i])
    conn.commit()
    return c.fetchone()

def artist_info(artistid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    i = str(artistid)
    c.execute("SELECT * FROM artists WHERE artistid=(?)", [i])
    conn.commit()
    return c.fetchone()

def tour(artistid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    i = str(artistid)
    c.execute("SELECT tourname FROM artists WHERE artistid=(?)", [i])
    conn.commit()
    name = c.fetchone()
    return name

def update_project(artistid,artistname,tourname,deadline,resolution,framerate):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("UPDATE artists SET artistname=?, tourname=?, deadline=?, resolution=?, framerate=? WHERE artistid=?",(artistname,tourname,deadline,resolution,framerate, artistid))
    conn.commit()
    conn.close()
    return 'success'
    
"""deletes tour"""
def delete_tour(aid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT * FROM tracks WHERE artistid=(?)", [aid])
    conn.commit()
    tracks = c.fetchall()
    for t in tracks:
        deleteTrack(t[0])
    c.execute("DELETE FROM artists WHERE artistid=(?)", [aid])
    conn.commit()
    c.close()
    conn.close()
    return 'Project deleted'




'''create track with default settings'''

def create_track_item(trackname, id):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    placeholder_thumb = 'Placeholder_thumbnail.png'
    t = create_track(trackname)
    c.execute(" INSERT INTO tracks VALUES (null, "
              ":artistid,"
              " :name,"
              " :priority,"
              " :content_status,"
              " :assigned_to,"
              " :pending_review,"
              " :progress, "
              ":thumbname,:desc, :tracklength)",
              {'artistid' : id,
               'name': t.trackname,
               'priority': t.priority,
               'content_status': t.status,
               'assigned_to': t.assigned,
               'pending_review': t.pending,
               'progress': t.progress,
               'thumbname': placeholder_thumb,'desc':t.desc, 'tracklength':t.tracklength})
    conn.commit()
    c.close()
    conn.close()
    print('track created')
    return

def tracks(artistid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    i = str(artistid)
    c.execute("SELECT * FROM tracks WHERE artistid=(?)", [i])
    conn.commit()
    return c.fetchall()

def get_completed_tracks(artistid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT progress FROM tracks WHERE artistid=(?)", [artistid])
    e = c.fetchall()
    conn.commit()

    total = len(e)
    completed = 0
    for p in range(total):
        j = e[p]
        if j[0] == 100:
            completed = completed + 1
        else:
            pass
    # convert to int

    if completed == 0:
        totalcomp = 0
        c.execute("UPDATE artists SET totaltracks=?, complete=?, progress=? WHERE artistid=?",(total, completed, totalcomp, artistid))
        conn.commit()
    else:
        totalcomp = completed / total * 100  #
        t = int(totalcomp)
        c.execute("UPDATE artists SET totaltracks=?, complete=?, progress=? WHERE artistid=?",(total, completed, t, artistid))
        conn.commit()
    conn.close()
    return totalcomp


def track_info(trackid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    i = str(trackid)
    c.execute("SELECT * FROM tracks WHERE trackid=(?)", [i])
    conn.commit()
    return c.fetchone()

def track_edited(tid,tname,desc,tl,assign):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("UPDATE tracks SET trackname=?, desc=?, assigned_to=?, tracklength=? WHERE trackid= ?", (tname,desc,assign,tl, tid))
    conn.commit()
    conn.close()
    return 'track updated.'

def update_track_priority(trackid,p):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("UPDATE tracks SET priority=? WHERE trackid= ?", (p, trackid))
    conn.commit()
    conn.close()
    return 'priority Updated'

def update_track_progress(tid):
    conn = sqlite3.connect(db)
    c = conn.cursor()

    c.execute("SELECT progress FROM tracksections WHERE trackid=(?)", [tid])
    e = c.fetchall()
    conn.commit()

    total = len(e)
    completed = 0
    for p in range(total):
        j = e[p]

        if j[0] == 100:
            completed = completed + 1
        else:
            pass

    # convert to int
    if completed == 0:
        totalcomp = 0
        c.execute("UPDATE tracks SET progress=? WHERE trackid= ?", (int(totalcomp), tid))

    else:
        totalcomp = completed / total * 100  #
        c.execute("UPDATE tracks SET progress=? WHERE trackid= ?", (int(totalcomp), tid))
    conn.commit()
    conn.close()


def create_section_layer(sectionid,layer,a,v,e):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("INSERT INTO sectionlayers VALUES(null, :sectionid, :layertype, :alpha, :version, :ext)",{'sectionid': sectionid, 'layertype': layer, 'alpha': a, 'version': v, 'ext':e})
    conn.commit()
    conn.close()

def update_layer(sid,layer,v,a,e):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("UPDATE sectionlayers SET layertype=?,alpha=?,version=?,ext=? WHERE layerid= ?", (layer, a, v, e, sid))
    conn.commit()
    conn.close()

def get_section_layer(sectionid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT * FROM sectionlayers WHERE sectionid=(?)", [sectionid])
    conn.commit()
    return c.fetchall()


def create_track_section(trackname,trackid):
    nts = track_section(trackname)
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute(" INSERT INTO tracksections VALUES (null, :tid,"
              " :name,"
              " :status,"
              " :progress,"
              " :pr)", {'tid': trackid,
                        'name': nts.trackname,
                        'status': nts.status,
                        'progress': nts.progress,
                        'pr': nts.pr})
    conn.commit()
    print('track section created')
    c.execute("SELECT * FROM tracksections").lastrowid
    return

def get_track_sections(trackid):
    i = str(trackid)
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT * FROM tracksections WHERE trackid=(?)", [i])
    conn.commit()
    return c.fetchall()

def update_track_sections(sectionid,status,name):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("UPDATE tracksections SET status=? WHERE sectionid= ?", (status, sectionid))
    conn.commit()
    c.execute("UPDATE tracksections SET name=? WHERE sectionid= ?", (name, sectionid))
    conn.commit()
    ps = get_progress(status)
    c.execute("UPDATE tracksections SET progress=? WHERE sectionid= ?", (ps, sectionid))
    conn.commit()
    conn.close()
    return "status Updated"


def upload_cover_photo(trackid,cpname):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("UPDATE tracks SET thumbname=? WHERE trackid= ?",(cpname, trackid) )
    conn.commit()
    conn.close()
    return ("images uploaded to flamingo.db")


def update_pending_review(trackid,pd):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("UPDATE tracks SET pending_review=? WHERE trackid=?",(pd, trackid) )
    conn.commit()
    conn.close()
    return 'track is pending review'


def export_track_section(sid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT * FROM sectionlayers WHERE sectionid=(?)", [sid])
    conn.commit()
    return c.fetchall()

def new_comment(sid,comment):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute(" INSERT INTO comments VALUES (null, :trackid,"
              " :name,"
              " :msg,"
              " :notify)", {'trackid': sid,
                        'name': 'Matt',
                        'msg': comment,
                        'notify': 1})
    conn.commit()
    conn.close()
    return 'new comment created'

def get_comments(sid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT * FROM comments WHERE trackid=(?)", [sid])
    conn.commit()
    return c.fetchall()

def editComment(cid,msg,u):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    n = 1 
    c.execute("UPDATE comments SET msg=?,notify=?,name=? WHERE commentid= ?", (msg,n,u,cid))
    conn.commit()
    conn.close()
    return 'comment edited'

    
def deleteComment(cid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("DELETE FROM comments WHERE commentid=(?)", [cid])
    conn.commit()
    conn.close()
    return 'comment deleted'
    
def deleteLayer(lid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("DELETE FROM sectionlayers WHERE layerid=(?)", [lid])
    conn.commit()
    conn.close()
    return 'layer deleted'

def deleteSection(tsid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("DELETE FROM tracksections WHERE sectionid=(?)", [tsid])
    conn.commit()
    c.execute("DELETE FROM sectionlayers WHERE sectionid=(?)", [tsid])
    conn.commit()
    c.execute("DELETE FROM comments WHERE trackid=(?)", [tsid])
    conn.commit()
    conn.close()
    return 'section and elements deleted'

def deleteTrack(tid):
    conn = sqlite3.connect(db)
    c = conn.cursor()
    c.execute("SELECT * FROM tracksections WHERE trackid=(?)", [tid])
    conn.commit()
    tracksections = c.fetchall()
    if not tracksections:
        pass
    else:
        for ts in tracksections:
            deleteSection(ts[0])
    c.execute("SELECT * FROM tracks WHERE trackid=?",[tid])
    conn.commit()
    track = c.fetchone()
    for file in os.listdir(client_uploads):
        if file == track[8]:
            os.remove(os.path.join(client_uploads,file))
        else:
            pass
    c.execute("DELETE FROM tracks WHERE trackid=?", [tid])
    conn.commit()
    return 'trackdeleted'
