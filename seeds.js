var mongoose=require("mongoose");
var campground=require("./models/campground");
var Comment=require("./models/comment");

var data=[
    {
        name:"cloud Rest",
        image:"https://typewriter.imgix.net/u/234af096-141a-4b8e-b9d0-94bd20d4b54e/p/37553/camping-at-keystone-camp-for-girls.jpg?ixlib=rails-2.1.4&auto=format%2Ccompress&crop=faces&fit=crop&h=675&w=900",
        description:"wow wow wow em Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the  site "
    },
    {
        name:"Night Wolf",
        image:"https://media.wired.com/photos/599b4cfd4fa6fc733c11e30d/master/pass/iStock-820873602.jpg",
        description:"Tem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the his site is danger site please DO NOT GO THERE!!!! "
    },
    {
        name:"Forest Gump",
        image:"https://cdn.pixabay.com/photo/2017/08/06/02/32/camp-2587926_960_720.jpg",
        description:"em Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the "
    }

    
]

function seedDB(){

    Comment.deleteMany({},function(err){
        console.log(err);
    });
    campground.deleteMany({},function(err){
        if (err) {
            console.log(err);
        }
        else{
           console.log ("Remove All campgrounds");
        //add new CampGrounds
        data.forEach(function(seed){
            campground.create(seed,function(err,data){
                if (err) {
                    console.log(err);
                }
                else{
                    console.log("campground created: "+seed.name);

                   
                    Comment.create(
                        {
                            text:"This place is Amazing i wish there is bathroom and Hot tub there",
                            author:"Jim Vantura"
                        
                        },function(err,comment){
                            if (err) {
                                console.log(err);
                            }
                            data.comments.push(comment);
                            data.save();
                            console.log("Add new Comment");

                        });
                }
            })
        })
        };
        
    });


}

module.exports=seedDB;
