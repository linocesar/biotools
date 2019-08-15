var data = {}


document.getElementById("fasta").addEventListener('change', function () {

    var filereader = new FileReader();
    var re = new RegExp(/^>/);
    var head = "";

    filereader.onload = function () {

        const linhas = this.result.split("\n");

        for (let index = 0; index < linhas.length; index++) {
            var linha = linhas[index].replace(/\r/g, '');

            if (re.test(linha)) {

                var aux = linha.split(" ");
                var id = aux[0].replace(/^>/ig, "");
                head = id;
                data[head] = "";

            } else {
                data[head] += linha + "\n";
            }
        }

    }

    filereader.readAsText(this.files[0]);

});


function search(locustag) {

    presente = false;

    for (var key in data) {

        if (key === locustag) {
            presente = true;
            break;
        } else {
            presente = false;
        }
    }
    return presente;
}

document.getElementById("lista").addEventListener('change', function () {
    var saida = "";
    var filereader = new FileReader();

    filereader.onload = function () {
        var fasta = this.result.split("\n");
        
        for (let index = 0; index < fasta.length; index++) {
            var linha = fasta[index].replace(/\r/g,'').replace(/^>/,'');

            if (search(linha)) {
                saida += ">" + linha + "\n" + data[linha];
                
            }
        }
        
        document.getElementById("fasta_texto").textContent = saida;
    }
    filereader.readAsText(this.files[0]);

});

    

