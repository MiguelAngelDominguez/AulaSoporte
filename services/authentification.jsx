import { useState, useEffect } from "react";
const [dateUSer, SetDateUser] = useState();

PATH = 'https://aulasoporte-api.aaron-navarro.workers.dev/api';

async function Auth() {
    try {
        let sesion = await fetch(PATH);
        sesion.
    } catch(error){
        console.error("Ocurrio el siguiente error", error);
    }
};