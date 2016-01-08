select offices.name as office_name, longitude, latitude, streetname, streetnum, city, zipcode 
from properties 
join offices on properties.office_id = offices.id 
where stage_code = 'closed' and disp_close_date >= date_sub(now(), interval 1 year) 