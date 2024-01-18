const app=Vue.createApp({
    data(){
        return {
            friends:[{
                id:1,
                name:"Shivani Khandelwal",
                phone:"1234567890",
                email:"Test@gmail.com"
            },
            {
                id:2,
                name:"Nilisha Khandelwal",
                phone:"1234567890",
                email:"Test2@gmail.com"
            }]
        }
    }
});


app.component('friend-contact',{
    template:`
    <li>
        <h2>{{friend.name}}</h2>
        <button @click="toggleShowButton()">{{showDetails?'Hide ':'Show '}}Details</button>
        <ul v-if="showDetails">
            <li><strong>Phone:</strong> {{friend.phone}}</li>
            <li><strong>Email:</strong> {{friend.email}}</li>
        </ul>
    </li>`,
    data()
    {
        return{
            showDetails:false,
            friend:{
                id:1,
                name:"Shivani Khandelwal",
                phone:"1234567890",
                email:"Test@gmail.com"
            }
        }
    },
    methods:{
        toggleShowButton()
        {
            this.showDetails=!this.showDetails;
        }
    }
})


app.mount("#app");

