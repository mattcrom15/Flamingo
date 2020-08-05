months = {
        'January' : '01',
        'February' : '02',
        'March' : '03',
        'April' : '04',
        'May' : '05',
        'June' : '06',
        'July' : '07',
        'August' : '08',
        'September' : '09',
        'October' : '10',
        'November' : '11',
        'December' : '12'
    }

def get_key(val): 
    for key, value in months.items(): 
         if val == value: 
             return key 

def convert_date(date):
    y,m,d = date.split('-')
    month = (get_key(m))

    

    return d +' ' + month + ' ' + y