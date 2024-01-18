function getAttackValue(min,max)
{
    return Math.floor((Math.random() * (max-min)) + min);
}

Vue.createApp({
    data()
    {
        return{
            playerHealth:100,
            monsterHealth:100,
            currentRound:0,
            message:'',
            disableAllButtons:false,
            logMessagesList:[]
        }
    },
    computed:{
        monsterHealthStyle()
        {
            if(this.monsterHealth<0)
            {
                return {width: '0%'}    
            }
            return {width: this.monsterHealth+'%'}
        },
        playerHealthStyle()
        {
            if(this.playerHealth<0)
            {
                return {width: '0%'}    
            }
            return {width: this.playerHealth+'%'}
        },
        disableSpecialAttackButton()
        {
            return this.currentRound%3!==0;
        }
    },
    watch:{
        playerHealth(value)
        {
            if(value<=0 && this.monsterHealth<=0)
            {
                this.disableAllButtons=true;
                this.message="Draw!";
            }
            else if(value<=0)
            {
                this.disableAllButtons=true;
                this.message="You lost!";
            }
        },
        monsterHealth(value)
        {
            if(value<=0 && this.playerHealth<=0)
            {
                this.disableAllButtons=true;
                this.message="Draw!";
            }
            else if(value<=0)
            {
                this.disableAllButtons=true;
                this.message="You won!";
            }
        }
    },
    methods:{
        startNewGame()
        {
            this.playerHealth=100;
            this.monsterHealth=100;
            this.currentRound=0;
            this.message='';
            this.disableAllButtons=false;
            this.logMessagesList=[];
        },
        attackMonster()
        {
            this.currentRound++;
            var attackValue=getAttackValue(5,12);
            this.monsterHealth-=attackValue;
            this.logMessages("Player","Attack",attackValue);
            this.attackPlayer();
        },
        attackPlayer()
        {
            var attackValue=getAttackValue(8,15);
            this.playerHealth-=attackValue;
            this.logMessages("Monster","Attack",attackValue);
        },
        specialMonsterAttack()
        {
            this.currentRound++;
            var attackValue=getAttackValue(10,25);
            this.monsterHealth-=attackValue;
            this.logMessages("Player","Special-Attack",attackValue);
            this.attackPlayer();
        },
        healPlayer()
        {
            this.currentRound++;
            var healValue=getAttackValue(10,15);
            if(this.playerHealth+healValue>100)
                this.playerHealth=100;
            else
                this.playerHealth+=healValue;
            this.logMessages("Player","Heal",healValue);
            this.attackPlayer();
        },
        surrender()
        {
            this.disableAllButtons=true;
            this.message="You lost!";
        },
        logMessages(who,what,value)
        {
            this.logMessagesList.unshift({
                actionBy:who,
                actionType:what,
                actionValue:value,
                playerH:this.playerHealth,
                monsterH:this.monsterHealth
            })
        }
    }
}).mount("#game")