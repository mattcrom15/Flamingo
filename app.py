from flask import Flask, render_template, request, redirect, jsonify, make_response, send_from_directory, send_file, url_for
import json
import os
from export import section_export
from PIL import Image
from changlog import edit_changelog
from date_convert import convert_date
import base64
from config import client_uploads
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("home.html")

"""project list"""
@app.route("/projects")
def index():
    from functions.db_edits import all_artist_tour, get_completed_tracks
    a = all_artist_tour()
    artist = a
    for a in artist:
        get_completed_tracks(a[0])
    return render_template("index.html", artist = artist)
"""create project"""

@app.route("/projectcreated", methods = ["POST"])
def create_project():
    if request.method == "POST":
        from functions.db_edits import create_show
        req = request.json
        print(req)
        arts = req["artist"]
        tour = req["tour"]
        create_show(arts, tour)
        msg = f'New project created. Artistname: {arts} Tourname: {tour}'
        edit_changelog(msg)
    res = make_response(jsonify({"Created": msg}), 200)
    return  res

@app.route("/edit-project", methods = ["PUT"])
def edit_project():
    from functions.db_edits import update_project
    req = request.json
    print(req)
    aid = req['aid']
    aname = req['artist']
    tname = req['tour']
    dline = req['deadline']
    rwidth = req['rwidth']
    rheight = req['rheight']
    frame= req['framerate']
    resolution = rwidth + 'x' + rheight
    date = convert_date(dline)
    update_project(aid,aname,tname,date,resolution,frame)
    msg = f'Project Updated. Artistname: {aname} Tourname: {tname} Deadline:{date} Resolution:{resolution} Framerate:{frame}'
    edit_changelog(msg)
    res = make_response(jsonify({"Created": msg}), 200)
    return 'hello'

"""delete project"""

@app.route("/projectdeleted", methods = ["DELETE"])
def delete_project():
    from functions.db_edits import delete_tour
    req = request.json
    print(req)
    aid = req['aid']
    artist = req['artist']
    tour = req['tour']
    delete_tour(aid)
    msg = f'Project Deleted. Artistname: {artist}. Tourname: {tour}'
    edit_changelog(msg)
    res = make_response(jsonify({"Deleted": msg}), 200)
    return  res

"""delete track"""

@app.route("/track/trackdeleted", methods = ["DELETE"])
def delete_track():
    from functions.db_edits import deleteTrack
    req = request.json
    print(req)
    tname = req['trackname']
    tid = req['tid']
    aid = req['aid']
    print(deleteTrack(tid))
    msg = f'Track Deleted. Trackname: {tname}. Artistid: {aid}'
    edit_changelog(msg)
    res = make_response(jsonify({"Deleted": msg}), 200)
    return  res



'''project dashboard'''

@app.route("/dashboard/")
def project():
    from functions.db_edits import artist_info, tracks
    b = request.args.get("artistid")
    ai = artist_info(b)
    t = tracks(b)
    return render_template("project_dashboard.html" , artist = ai, track = t)

'''return all tracks'''
@app.route("/track/", methods = ["GET","POST"])
def track():
    from functions.db_edits import artist_info, track_info, get_track_sections, update_track_progress
    b = request.args.get("tid")
    t = track_info(b)
    a = artist_info(t[1])
    # print(t[1])
    ts = get_track_sections(b)
    update_track_progress(b)
    return render_template("track.html" , a = a, t = t, tracksections = ts)

'''new track'''

@app.route("/track/new-track", methods = ["POST"])
def create_track():
    from functions.db_edits import create_track_item, get_completed_tracks
    req = request.get_json()
    #print(req)
    a_id = req["aid"]
    """total tracks"""
    total_tracks = str(req["total"])
    """loops through track selections"""
    for i in range(int(total_tracks)):
        c = req['track' + str(i)]
        """create track function"""
        create_track_item(c,a_id)
        msg = f'New Track Created. Trackname: {c} ArtistID: {a_id}'
        edit_changelog(msg)
    get_completed_tracks(a_id)
    res = make_response(jsonify({"Success!": msg}), 200)
    return  res

@app.route("/track/edit-track", methods = ["PUT"])
def edit_track():
    from functions.db_edits import track_edited
    req = request.json
    tid =  req['trackid']
    tname =  req['trackname']
    des =  req['description']
    tl = req['tracklength']
    assign =  req['assigned']
    track_edited(tid,tname,des,tl,assign)
    msg = f' Track Edited. Trackname: {tname} TracknameID: {tid} Description: {des} Tracklength: {tl} Assigned to: {assign}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success!": msg}), 200)
    return res

'''new track section'''

@app.route("/track/new-track-section", methods = ["POST"])
def create_track_section():
    from functions.db_edits import create_track_section
    req = request.get_json()
    t_id = req["tid"]
    """total tracks"""
    total_tracks = str(req["total"])
    """loops through track selections"""
    for i in range(int(total_tracks)):
        c = req['track-section' + str(i)]
        """create track function"""
        create_track_section(c,t_id)
        msg = f'New Track Section Created. Tracksection: {c} TrackID: {t_id}'
        edit_changelog(msg)
    res = make_response(jsonify({"Success!":msg}), 200)
    return res
'''edit track section'''

@app.route("/track/edit-track-section", methods = ["POST"])
def edit_track_section():
    from functions.db_edits import update_track_sections
    req = request.get_json()
    tsid = req["sid"]
    status = req["sstatus"]
    name = req["sname"]
    update_track_sections(tsid,status,name)
    msg = f'Track section edited. TrackID: {tsid} Tracksection: {name} Status: {status}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success!": msg}), 200)
    return res

'''delete track section'''

@app.route("/track/delete-track-section", methods = ["DELETE"])
def delete_track_section():
    from functions.db_edits import deleteSection
    req = request.get_json()
    tsid = req["tsid"]
    tid = req['tid']
    name = req["tsname"]
    deleteSection(tsid)
    msg = f'Track section Deleted. TrackID: {tsid} Tracksection: {name}'
    print(msg)
    edit_changelog(msg)
    res = make_response(jsonify({"Success!": msg}), 200)
    return res

'''update priority'''

@app.route("/track/update-priority", methods = ["POST"])
def update_priority():
    from functions.db_edits import update_track_priority
    req = request.get_json()
    tsid = req["tid"]
    prio = req["priority"]
    print(tsid, prio)
    update_track_priority(tsid,prio)
    msg = f'Priority Updated. TrackID: {tsid} Priority: {prio}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success!": msg}), 200)
    return res

@app.route("/track/track-from-file", methods = ["POST"])
def tff():
    from functions.db_edits import create_track
    from functions.flamingo_functions  import track_from_file

    # msg = f'Tracks Created. Trackname: {tsid} Tracksection: {name}'
    # edit_changelog(msg)
    res = make_response(jsonify({"Success!": 'tracks created'}), 200)
    return res


'''upload cover photo'''


@app.route("/track/upload-image", methods = ["POST"])
def upload_image():
    from functions.flamingo_functions import create_track_photos
    from functions.db_edits import upload_cover_photo, track_info
    req = request.form

    #tid = req['trackid']
    img = req['image']
    tid = req['trackid']
    tname = req['trackname']
    stripimg = img.replace('data:image/png;base64,','')
    cp = create_track_photos(stripimg,client_uploads,tid,tname)
    upload_cover_photo(tid,cp)
    msg = f'New image uploaded. Trackid: {tid} Trackname: {tname} Cover photo filename: {cp}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success": msg}), 200)
    return res

'''section layer info'''
@app.route("/track/section-layer-info", methods = ["GET","POST"])
def get_section_info():
    from functions.db_edits import get_section_layer,get_comments
    if request.method == "POST":
        reply = {
            'Layers':'',
            'Comments':''}
        req = request.json
        sid = req['tid']
        gsl = get_section_layer(sid)
        com = get_comments(sid)
        print(com)
        if not gsl:
            print('nothing in here')
            reply['Layers'] = "No section-layers assigned"
        else:
            layerempty = {}
            msg = {"layers":layerempty}
            for layer in gsl:
                ltype = layer[2]
                lalpha = layer[3]
                lversion = layer[4]
                lext = layer[5]
                layerJson = {
                    "layer" + str(layer[0]):[{
                    "layerid":layer[0],    
                    "type":ltype,
                    "alpha":lalpha,
                    "version":lversion,
                    'ext':lext}]}
                layerempty.update(layerJson) 
                reply['Layers'] = layerempty
            # print(json.dumps(msg))
        if not com:
            reply['Comments'] = "No Comments assigned"
        else:
            commentempty = {}
            for c in com:
                user = c[2]
                commentid = c[0]
                comment = c[3]
                notify = c[4]
                commentJson = {
                    "comment" + str(c[0]):[{
                    "commentid":c[0],    
                    "msg":comment,
                    "unread":notify,
                    "user":user}]}
                commentempty.update(commentJson) 
                reply['Comments'] = commentempty
        msg = {"reply":reply}
        res = make_response(msg, 200)

    return res

'''new comment'''

@app.route("/track/new-comment", methods = ["POST"])
def new_comment():
    from functions.db_edits import new_comment
    req = request.json
    sid = req['sectionid']
    comment = req['Comment']
    section = req['sectionname']
    new_comment(sid,comment)
    msg = f'New Comment Submited. track:{section} comment:{comment}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success": msg}), 200)
    return res
'''new layer'''
@app.route("/track/new-layer", methods = ["POST"])
def new_layer():
    from functions.db_edits import create_section_layer
    req = request.json
    sid = req['sectionid']
    l = req['layer']
    v = req['version']
    a = req['alpha']
    if a == 'False':
        a = 1
    else:
        a = 0
    e = req['extension']
    print(e)
    create_section_layer(sid,l,a,v,e)
    msg = f'New Layer created. Layer: {l} Extension: {e} Alpha:{str(a)} Version: {v}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success": 'msg'}), 200)
    return res
'''update track layer'''
@app.route("/track/update-layer", methods = ["PUT"])
def update_layer():
    from functions.db_edits import update_layer
    req = request.json
    sid = req['layerid']
    l = req['layer']
    v = req['version']
    a = req['alpha']
    if a == 'False':
        a = 1
    else:
        a = 0
    e = req['extension']
    print(v)
    update_layer(sid,l,v,a,e)
    msg = f'Layer Updated. Layer: {l} Extension: {e} Alpha:{str(a)} Version: {v}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success": 'msg'}), 200)
    return res

'''delete layer'''
@app.route("/track/delete-layer", methods = ["DELETE"])
def delete_layer():
    from functions.db_edits import deleteLayer
    req = request.json
    print(req)
    tsid = req['tsid']
    lid = req['lid']
    lname = req['lname']
    deleteLayer(lid)
    return 'deleted' 

@app.route("/track/delete-comment", methods = ["DELETE"])
def delete_comment():
    from functions.db_edits import deleteComment
    req = request.json
    print(req)
    tsid = req['tsid']
    cid = req['cid']
    deleteComment(cid)
    return 'deleted'


'''exportsection'''
@app.route("/track/export-section", methods = ["POST","GET"])
def export_section():
    from functions.db_edits import export_track_section
    req = request.json
    print(req)
    sid = req['tracksecid']
    tname = req['trackname']
    tsec = req['tracksection']
    e=export_track_section(sid)
    se = section_export(tname,tsec,e)

    fpath = '/home/mattcromwell/Documents/workflow/python/' + se
    print(fpath)
    # msg = f'Section exported. Layer: {l} Extension: {e} Alpha:{str(a)} Version: {v}'
    return redirect(url_for('return_file',filename = se))
    

@app.route('/return-file/<filename>')
def return_file(filename):
    return send_from_directory(os.path.join('/home/mattcromwell/Documents/workflow/python/Clientfiles/json/',''),filename,as_attachment=True)
    
    
@app.route('/track/review-pending', methods=["PUT"])
def pending_review():
    from functions.db_edits import update_pending_review
    req = request.json
    print(req)
    tid = req['trackid']
    pr = req['pr']
    tname = req['trackname']
    if pr == 'true':
        pr = 1
    else:
        pr = 0
    update_pending_review(tid,pr)
    msg = f'Pending Review. track:{tname}'
    edit_changelog(msg)
    return 'thanks'


@app.route('/track/edit-comment', methods=["PUT"])
def edit_comment():
    from functions.db_edits import editComment
    req = request.json
    sid = req['sectionid']
    comment = req['Comment']
    section = req['sectionname']
    user = req['user']
    cid = req['commentid']
    editComment(cid,comment,user)
    print(req)
    msg = f'Comment Edited. track:{section} comment:{comment}'
    edit_changelog(msg)
    res = make_response(jsonify({"Success": msg}), 200)
    return res


if __name__ =='__main__':
    app.run(debug=True)



