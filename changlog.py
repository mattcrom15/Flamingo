def currentDateTime():
    from datetime import date, datetime
    today = date.today()
    t = datetime.now()
    h = t.hour
    m = t.minute
    s = t.second
    if h < 10:
        h = '0' + str(h)
    else:
        pass
    if m < 10:
        m = '0' + str(m)
    else:
        pass
    if s < 10:
        s = '0' + str(s)
    else:
        pass
    time = f'{h}:{m}:{s}'
    timelog = f'{today} {time}'
    return timelog


def edit_changelog(msg):
    with open('Flamingo_changelog.txt','a') as f:
        f.write('\n')
        f.write(currentDateTime())
        f.write('---')
        f.write(msg)

