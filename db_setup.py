from projects import create_project
import sqlite3

conn = sqlite3.connect('flamingo.db')
c = conn.cursor()

#create artist table

c.execute('CREATE TABLE IF NOT EXISTS artists(artistid INTEGER primary key AUTOINCREMENT, '
          'artistname TEXT, '
          'tourname TEXT, '
          'totaltracks INTEGER, '
          'complete INTEGER,'
          ' progress INTEGER, deadline TEXT,resolution TEXT, framerate TEXT)')
conn.commit()

#create tracks table

c.execute('CREATE TABLE IF NOT EXISTS tracks(trackid INTEGER primary key AUTOINCREMENT, '
          'artistid INTEGER, '
          'trackname TEXT,'
          ' priority TEXT,'
          ' content_status TEXT,'
          ' assigned_to TEXT,'
          ' pending_review INTEGER, '
          'progress INTEGER,'
          ' thumbname TEXT, desc TEXT, tracklength TEXT)')
conn.commit()

#create tracksections table

c.execute('CREATE TABLE IF NOT EXISTS tracksections(sectionid INTEGER primary key AUTOINCREMENT,'
          ' trackid INTEGER, name TEXT,'
          ' status TEXT, '
          'progress INTEGER,'
          ' pr INTEGER)')
conn.commit()


#comments table
c.execute('CREATE TABLE IF NOT EXISTS comments(commentid INTEGER primary key AUTOINCREMENT,'
          ' trackid INTEGER, '
          'name TEXT,'
          ' msg TEXT,'
          ' notify INTEGER)')
conn.commit()

#create sectionlayers

c.execute('CREATE TABLE IF NOT EXISTS sectionlayers(layerid INTEGER primary key AUTOINCREMENT,'
          'sectionid INTEGER, '
          'layertype TEXT,'
          'alpha INTEGER,'
          'version INTEGER,'
          'ext TEXT)')
conn.commit()

c.close()
conn.close()

print('Database created')
