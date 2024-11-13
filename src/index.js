/*import express from "express";
import express_graphql from "express-graphql";
import { buildSchema } from "graphql";

const app = express();
const expressgraphql = express_graphql
const builsSheme = buildSchema

app.use("/graphql" ,expressgraphql())

app.listen(3005,()=>{
    console.log("Corriendo por el puerto 3005");
    
})*/
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import boocks  from './data.js';

const app = express();

const schema = buildSchema (`
    type Query {
        boock(id:Int!) : Boock
        boocks(autor:String): [Boock]
    }    

    type Boock {
        id: Int,
        title : String,
        autor: String
    }
`);

let getBoock = (params) => {
   let id = params.id;
   return  boocks.find( b => b.id ===id )
}

let getBoocks = (params) => {
    if (params.autor){
        let autor = params.autor;
        return  boocks.filter( b => b.autor ===autor )
    }else {
        return boocks
    }
    
 }

const root = {
    boock: getBoock,
    boocks:getBoocks
}

app.use('/graphql', graphqlHTTP({
    graphiql:true,
    schema:schema,
    rootValue:root
}));

app.listen(3005, () => {
  console.log('Corriendo por el puerto 3005');
  //console.log(boocks);
  
});