let secret = "KNTSF";
let active_row = 1;

initiate_Quiz();
function initiate_Quiz(){
    for(let i=1;i<=6;i++){
        for (let j=1;j<=5;j++){
            //Erstelle 6 Reihen, 5 5 Felder
            div = document.createElement("div");
            div.classList = "wordle_box";
            div.id = `field_${i}_${j}`;
            document.querySelector(".wordle_wrapper").appendChild(div);

            //Erstelle je ein Input Text Element pro Feld
            temp = document.createElement("input");
            temp.setAttribute("type", "text");
            temp.setAttribute("maxlength", "1");
            div.appendChild(temp);
        }
    }  
    secret = decrypt_secrect(secret);
    //Deaktiviere am Anfang alle Felder bis auf die erste Reihe
    for(let i=1;i<=6;i++){
        for (let j=1;j<=5;j++){
            if (active_row != i){
                document.getElementById(`field_${i}_${j}`).childNodes[0].disabled = true;
            }
        }
    }
}

document.querySelector('.test_button').addEventListener("click", (e) => {
    e.preventDefault;

    for (let i=1;i<=5;i++){
        // Mach alle Felder grau
        document.getElementById(`field_${active_row}_${i}`).childNodes[0].style.backgroundColor ="grey";

        //Teste, ob Buchstabe richtig, aber an falscher Stelle. Dann gelb
        for (let j=1;j<=5;j++){
            if(document.getElementById(`field_${active_row}_${i}`).childNodes[0].value.toUpperCase() == secret.charAt(j-1).toUpperCase()){
                document.getElementById(`field_${active_row}_${i}`).childNodes[0].style.backgroundColor ="rgb(252,194,0)";
            }
        }

        // Teste, ob Buchstabe richtig UND an der richtigen Stelle
        if(document.getElementById(`field_${active_row}_${i}`).childNodes[0].value.toUpperCase() == secret.charAt(i-1).toUpperCase()){
            document.getElementById(`field_${active_row}_${i}`).childNodes[0].style.backgroundColor ="green";
        }
    }

    // Teste, ob Eingabe komplett richtig war
    let result = true;
    test_loop: for(let i=1;i<=5;i++){
        if(document.getElementById(`field_${active_row}_${i}`).childNodes[0].value.toUpperCase() != secret.charAt(i-1).toUpperCase()){
            result = false;
            break test_loop;
        }
    }

    if (result) {                                                               // Wenn Eingabe komplett richtig
        document.querySelector(".test_button").disabled = true;
        document.querySelector(".test_button").style.backgroundColor = "green";
        document.querySelector(".test_button").style.color = "white";
        document.querySelector(".test_button").innerHTML = "! RICHTIG !<br>Herzlichen Glückwunsch, du hast richtig geraten.<br>Als Belohnung darfst du einmal bei uns die Wohnung putzen :)";
        document.querySelector(".test_button").style.height ="150px";
        
    } else if((!result) && (active_row == 6)){                                  // Wenn Eingabe nach 6 Versuchen falsch  
        document.querySelector(".test_button").disabled = true;
        document.querySelector(".test_button").style.backgroundColor = "red";
        document.querySelector(".test_button").style.color = "white";
        document.querySelector(".test_button").innerHTML = "Leider falsch !";
    }

    active_row = active_row + 1;

    //Deaktiviere alle Felder bis auf die aktive Reihe
    for(let i=1;i<=6;i++){
        for (let j=1;j<=5;j++){
            if (active_row != i){
                document.getElementById(`field_${i}_${j}`).childNodes[0].disabled = true;
                document.getElementById(`field_${i}_${j}`).childNodes[0].style.color ="white";
            } else {                
                document.getElementById(`field_${i}_${j}`).childNodes[0].disabled = false;
                document.getElementById(`field_${i}_${j}`).childNodes[0].style.color ="black";
            }
        }
    }

})

function decrypt_secrect(_secret){
    let result = ""; 
    for (let i=0;i<5;i++){
        result += String.fromCharCode(_secret.charAt(i).charCodeAt(0)-5);
    }
    return result;
}

