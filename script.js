class Produto {
    arrayProdutos = [];
    id = [];
    construtora() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editID = null;

   }
    salvar() {
      let produto = this.lerDados();
      
      if(this.validarCampos(produto)) {
        if(this.editID == null) {
            this.adicionar(produto);
        } else {
            this.atualizar(this.editID, produto);
        }
        
      }
      this.listaTabela();
      this.cancelar();
    
   }

   listaTabela() {
    let tbody = document.getElementById('tbody');
    tbody.innerText = '';

    for(let i = 0; i < this.arrayProdutos.length; i++) {
        let tr = tbody.insertRow();
        let td_id = tr.insertCell();
        let td_produto = tr.insertCell();
        let td_preco = tr.insertCell();
        let td_acoes = tr.insertCell();

        td_id.innerText = this.arrayProdutos[i].id;
        td_produto.innerText = this.arrayProdutos[i].nomeProduto;
        td_preco.innerText = this.arrayProdutos[i].preco;

        // td_id.classlist.add('center');

        let imgEditar = document.createElement('img');
        imgEditar.src = 'img/editar.png';
        imgEditar.setAttribute("onclick", "produto.preparaEdicao("+ JSON.stringify(this.arrayProdutos[i]) +")");

        let imgExcluir = document.createElement('img');
        imgExcluir.src = 'img/excluir.png'
        imgExcluir.setAttribute("onclick", "produto.excluir("+ this.arrayProdutos[i].id +")"); //setAttribute('evento', 'ação')

        td_acoes.appendChild(imgEditar); 
        td_acoes.appendChild(imgExcluir);
        
    }
   }
   
   
    adicionar(produto) {
        produto.preco = parseFloat(produto.preco); // transformar para decimais
        this.arrayProdutos.push(produto);
        this.id++;
       }

    atualizar(id, produto) {
        for(let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].preco = produto.preco;
            }
        }

    }   

    preparaEdicao(dados) {
        this.editID = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('preco').value = dados.preco;

        document.getElementById('button1').innerText = 'Atualizar';

    }   

    lerDados() {
        let produto = {} 
        
        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.preco = document.getElementById('preco').value;
        return produto;
     }
 
    
    validarCampos(produto) {
        let mensagem = '';
        
        if(produto.nomeProduto == '') {
            mensagem += '- Informe o nome do produto \n';
    }
    if(produto.preco == '') {
        mensagem += '- Informe o preço do produto \n';
    }
    if(mensagem != '') {
        alert(mensagem);
        return false
    }
    return true
   }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('preco').value = '';

        document.getElementById('button1').innerText = 'Salvar';
        this.editID = null;
      
   }

    excluir(id) {
        if(confirm('Deseja realmente excluir o item ' + id)) {
            let tbody = document.getElementById('tbody'); // para pegarmos algum item abaixo do tbody
            
            for(let i = 0; i < this.arrayProdutos.length; i++) {
                if(this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1); // splice(indice do array, quantidade a ser deletada)
                    tbody.deleteRow(i);
                }
            }
    
        }
    }
   
}
var produto = new Produto();
