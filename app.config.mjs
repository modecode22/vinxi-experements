import { createApp } from 'vinxi';
import reactRefresh from "@vitejs/plugin-react";
export default createApp({
    routers:[
        {
            name:'images',
            type:'static',
            base:'/images',
            dir:'./images',
        },
        {
            name:'api',
            type:'http',
            base:'/api',
            handler:'./api/index.ts',
        },
        {
            name:'client',
            type:'spa',
            handler:'/index.html',
            target:'browser',
            plugins:()=>[reactRefresh()],
        },
    ]
})