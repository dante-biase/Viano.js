

const computer_key_chars =  "1234567890qwertyuiopasdfghjklzxcvbnm".split('');

const character_map = [];
character_map[8] = "";
character_map[9] = "";
character_map[13] = "\n";
character_map[16] = "";
character_map[17] = "";
character_map[18] = "";
character_map[19] = "";
character_map[20] = "";
character_map[27] = "";
character_map[32] = " ";
character_map[33] = "";
character_map[34] = "";
character_map[35] = "";
character_map[36] = "";
character_map[37] = "";
character_map[38] = "";
character_map[39] = "";
character_map[40] = "";
character_map[45] = "";
character_map[46] = "";
character_map[48] = "0";
character_map[49] = "1";
character_map[50] = "2";
character_map[51] = "3";
character_map[52] = "4";
character_map[53] = "5";
character_map[54] = "6";
character_map[55] = "7";
character_map[56] = "8";
character_map[57] = "9";
character_map[59] = ";";
character_map[61] = "=";
character_map[65] = "a";
character_map[66] = "b";
character_map[67] = "c";
character_map[68] = "d";
character_map[69] = "e";
character_map[70] = "f";
character_map[71] = "g";
character_map[72] = "h";
character_map[73] = "i";
character_map[74] = "j";
character_map[75] = "k";
character_map[76] = "l";
character_map[77] = "m";
character_map[78] = "n";
character_map[79] = "o";
character_map[80] = "p";
character_map[81] = "q";
character_map[82] = "r";
character_map[83] = "s";
character_map[84] = "t";
character_map[85] = "u";
character_map[86] = "v";
character_map[87] = "w";
character_map[88] = "x";
character_map[89] = "y";
character_map[90] = "z";
character_map[91] = "";
character_map[92] = "";
character_map[93] = "";
character_map[96] = "0";
character_map[97] = "1";
character_map[98] = "2";
character_map[99] = "3";
character_map[100] = "4";
character_map[101] = "5";
character_map[102] = "6";
character_map[103] = "7";
character_map[104] = "8";
character_map[105] = "9";
character_map[106] = "*";
character_map[107] = "+";
character_map[109] = "_";
character_map[107] = "+";
character_map[111] = "/";
character_map[112] = "";
character_map[113] = "";
character_map[114] = "";
character_map[115] = "";
character_map[116] = "";
character_map[117] = "";
character_map[118] = "";
character_map[119] = "";
character_map[120] = "";
character_map[121] = "";
character_map[122] = "";
character_map[123] = "";
character_map[144] = "";
character_map[145] = "";
character_map[186] = ";";
character_map[187] = "=";
character_map[188] = ",";
character_map[189] = "-";
character_map[190] = ".";
character_map[191] = "/";
character_map[192] = "`";
character_map[219] = "[";
character_map[220] = "\\";
character_map[221] = "]";
character_map[222] = "'";


const character_map_shift = [];
character_map_shift[8] = "";
character_map_shift[9] = "";
character_map_shift[13] = "\n";
character_map_shift[16] = "";
character_map_shift[17] = "";
character_map_shift[18] = "";
character_map_shift[19] = "";
character_map_shift[20] = "";
character_map_shift[27] = "";
character_map_shift[32] = " ";
character_map_shift[33] = "";
character_map_shift[34] = "";
character_map_shift[35] = "";
character_map_shift[36] = "";
character_map_shift[37] = "";
character_map_shift[38] = "";
character_map_shift[39] = "";
character_map_shift[40] = "";
character_map_shift[45] = "";
character_map_shift[46] = "";
character_map_shift[48] = ")";
character_map_shift[49] = "!";
character_map_shift[50] = "@";
character_map_shift[51] = "#";
character_map_shift[52] = "$";
character_map_shift[53] = "%";
character_map_shift[54] = "^";
character_map_shift[55] = "&";
character_map_shift[56] = "*";
character_map_shift[57] = "(";
character_map_shift[59] = ":";
character_map_shift[61] = "+";
character_map_shift[65] = "A";
character_map_shift[66] = "B";
character_map_shift[67] = "C";
character_map_shift[68] = "D";
character_map_shift[69] = "E";
character_map_shift[70] = "F";
character_map_shift[71] = "G";
character_map_shift[72] = "H";
character_map_shift[73] = "I";
character_map_shift[74] = "J";
character_map_shift[75] = "K";
character_map_shift[76] = "L";
character_map_shift[77] = "M";
character_map_shift[78] = "N";
character_map_shift[79] = "O";
character_map_shift[80] = "P";
character_map_shift[81] = "Q";
character_map_shift[82] = "R";
character_map_shift[83] = "S";
character_map_shift[84] = "T";
character_map_shift[85] = "U";
character_map_shift[86] = "V";
character_map_shift[87] = "W";
character_map_shift[88] = "X";
character_map_shift[89] = "Y";
character_map_shift[90] = "Z";
character_map_shift[91] = "";
character_map_shift[92] = "";
character_map_shift[93] = "";
character_map_shift[96] = "0";
character_map_shift[97] = "1";
character_map_shift[98] = "2";
character_map_shift[99] = "3";
character_map_shift[100] = "4";
character_map_shift[101] = "5";
character_map_shift[102] = "6";
character_map_shift[103] = "7";
character_map_shift[104] = "8";
character_map_shift[105] = "9";
character_map_shift[106] = "*";
character_map_shift[107] = "+";
character_map_shift[109] = "_";
character_map_shift[107] = "+";
character_map_shift[111] = "/";
character_map_shift[112] = "";
character_map_shift[113] = "";
character_map_shift[114] = "";
character_map_shift[115] = "";
character_map_shift[116] = "";
character_map_shift[117] = "";
character_map_shift[118] = "";
character_map_shift[119] = "";
character_map_shift[120] = "";
character_map_shift[121] = "";
character_map_shift[122] = "";
character_map_shift[123] = "";
character_map_shift[144] = "";
character_map_shift[145] = "";
character_map_shift[186] = ":";
character_map_shift[187] = "+";
character_map_shift[188] = "<";
character_map_shift[189] = "_";
character_map_shift[190] = ">";
character_map_shift[191] = "?";
character_map_shift[192] = "~";
character_map_shift[219] = "{";
character_map_shift[220] = "|";
character_map_shift[221] = "}";
character_map_shift[222] = "\"";


const piano_notes = [
    "C2",
    "C#2",
    "D2",
    "D#2",
    "E2",
    "F2",
    "F#2",
    "G2",
    "G#2",
    "A2",
    "A#2",
    "B2",
    "C3",
    "C#3",
    "D3",
    "D#3",
    "E3",
    "F3",
    "F#3",
    "G3",
    "G#3",
    "A3",
    "A#3",
    "B3",
    "C4",
    "C#4",
    "D4",
    "D#4",
    "E4",
    "F4",
    "F#4",
    "G4",
    "G#4",
    "A4",
    "A#4",
    "B4",
    "C5",
    "C#5",
    "D5",
    "D#5",
    "E5",
    "F5",
    "F#5",
    "G5",
    "G#5",
    "A5",
    "A#5",
    "B5",
    "C6",
    "C#6",
    "D6",
    "D#6",
    "E6",
    "F6",
    "F#6",
    "G6",
    "G#6",
    "A6",
    "A#6",
    "B6",
    "C7"
]


// function generate_notes() {
//     let key_note_map = [];
//     for (let i = 2; i < 7; ++i) {
//         for(let note_group of ["CDE", "FGAB"]) {
//             let notes = note_group.split('');
//             for(let note of notes.slice(0, -1)) {
//                 key_note_map.push(note + i);
//                 key_note_map.push(note + "#" + i);
                
//             }
//             key_note_map.push(notes[notes.length - 1] + i);
//         }
//     }
//     key_note_map.push("C7");
//     return key_note_map;
// }

function get_key_shift_value(key) {
    const is_letter = (key) => key.toLowerCase() != key.toUpperCase();

    if (is_letter(key)) return key.toUpperCase();
    else {
        let key_code = key.charCodeAt(0);
        return character_map_shift[key_code];
    }
}

// function generate_notes() {
//     let key_note_map = [];
//     let i = 0;
//     let j = 2; 
//     for (;j < 7; ++j) {
//         for(let note_group of ["CDE", "FGAB"]) {
//             let notes = note_group.split('');
//             for(let note of notes.slice(0, -1)) {
//                 key_note_map.push({
//                     char: computer_key_chars[i],
//                     note: note + j
//                 });
//                 key_note_map.push({
//                     char: get_key_shift_value(computer_key_chars[i]),
//                     note: note + "#" + j
//                 });
//                 i += 1;
//             }

//             key_note_map.push({
//                 key: computer_key_chars[i],
//                 note: notes[notes.length - 1] + j
//             });

//             i += 1;
//         }
//     }
//     key_note_map.push({
//         key: computer_key_chars[i],
//         note: "C" + j
//     });
//     return key_note_map;
// }

function generate_key_note_map() {
    let key_note_map = {};
    let knm0 = {};
    let i = 0;
    let j = 2;
    let k = 0; 
    for (;j < 7; ++j) {
        for(let note_group of ["CDE", "FGAB"]) {
            let notes = note_group.split('');
            for(let note of notes.slice(0, -1)) {
                let key = computer_key_chars[i];
                key_note_map[key] = {index: k, note: note + j};
                key_note_map[get_key_shift_value(key)] = {index: k + 1, note: note + "#" + j};

                knm0[key] = note + j;
                knm0[get_key_shift_value(key)] = note + "#" + j;

                i += 1;
                k += 2
            }
            key_note_map[computer_key_chars[i]] = {index: k, note: notes[notes.length - 1] + j};
            
            knm0[computer_key_chars[i]] = notes[notes.length - 1] + j;
            
            i += 1;
            k += 1;
        }
    }
    key_note_map[computer_key_chars[i]] = {index: k, note: "C" + j};
    
    knm0[computer_key_chars[i]] = "C" + j;
    
    return [key_note_map, knm0];
}

const [key_note_map, knm0] = generate_key_note_map();
