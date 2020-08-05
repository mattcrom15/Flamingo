import json

jsonPath = '/home/mattcromwell/Documents/workflow/python/ClientFiles/json/'
def section_export(tname,tsec,layers):

    layersList = {}

    for l in layers:
        lid = l[0]
        lt = l[2]
        la = l[3]
        if la == 1:
            la = 'True'
        else: la = 'False'
        lv = l[4]
        le = l[5]
        layer = {
            'layer-type':lt,
            'layer-extension':le,
            'layer-alpha':la,
            'layer-version':lv}
        layersList['layer' + str(lid)] = layer

    fe = {
        "track":{
            "trackname":tname,
            "sections":{
                tsec:{
                    'layer': layersList
                }
            }
            
        }
    }
    fname = jsonPath + tsec + '.json'
    with  open(fname,'w') as f:
        j=json.dumps(fe,indent=4)
        f.write(j)
    return fname

