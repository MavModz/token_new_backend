
## token web app....


# first show all the vendor list ...

## END POINT..


 to see all the list of vendor...


method :GET

/admin/vendor






1 - when u click on any vendor then u can see all the coupon which has been generated by theme and u have used ...

method : GET

/admin/settle/coupon/: enter vendor id (_id)



2 - after that when u click any coupon then new request will send.... 

method : POST

/admin/settle/send/ enter coupon code here ..


3 . whichever request will recieve from admin that will show in recieve req routes ..


method : GET 

/admin/settle/recieved

4 .  all the recieve request u can accept and reject when u click any one item then connect...

method : PATCH

 /admin/settle/accepted/:enter item here ...


5 .  vendor can also reject the request which is coming from admin...

method : PATCH

/admin/settle/accepted/:enter item here ...


6 . when vendor can forward after accept by vendor1 admin will forward to vendor 2 then vendor2 will accept either can reject ..

method : PATCH

/admin/settle/final/accept/: eneter item id here ...

# REJECT

/admin/settle/final/accept/:  enter item id here ...



 # admin route only it will show on admin panel ....



1 . admin can show all the  request which is incoming...

method :GET

/admin/recieved/request 

2 .   admin can click any request can forward to vendor 1

method : POST

admin/forward/: enter the id as params...



3 .  when status will accept show the u will click to return request vendor 2

method  : PATCH


/admin//return/: enter id as params..


# Personal Info:-
this route will be used for all the users (super-admin,vendor,user)

mehtod:get

admin/personalInfo

this route will be used for all the users (super-admin,vendor,user)

method: patch

admin/personalInfo/update

# Checkout:-

This route will be used for admin and vendor

method: post

admin/checkout

# coupon for vendor
method:get 

/admin/settle/coupon/:TovendorId

# send request
method:post 

/admin/settle/send/:couponCode

# Admin Received  Request for Approved:-
method: get

admin/admin/recieved/request

# Admin Received  Request for Approved will forward:-
method:post

admin/forward/:_id

# Admin Received  Request for Approved will return:-
method:patch

admin/return/:_id

# Vendor Received request for approved:-
method: get

admin/vendor/recieved/request

# Vendor Received request for approved will update:-
method: patch

admin/vendor/recieved/request/accept/:_id















 





