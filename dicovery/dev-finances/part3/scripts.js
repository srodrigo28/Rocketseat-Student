const Modal = {
    open() {
        // Abrir modal adiciona a class active do modal
        document.querySelector('.modal-overlay').classList.add('active');
    },
    close() {
        // Fechar modal remove a class active do modal
        document.querySelector('.modal-overlay').classList.remove('active');
    }
}

const Storage = {
    get(){
        return JSON.parse(localStorage.getItem
        ("dev.finances:transactions")) || []
    },
    set(transactions){
        localStorage.setItem("dev.finances:transactions",
        JSON.stringify(transactions))
    }
}
/** Lembranças 
 1. [ ]  incomes somar as entradas
// 2. [ ]  expenses somar as saídas
// 3. [ ]  total entradas - saídas
// 4. [ ]  expenses somar as saídas */

const Transaction = {
    all: Storage.get(),
    //     [
    //    { description: 'Casa gás', amount: -9454, date: '23/01/2021' },
    //     { description: 'Salário', amount: 79000, date: '23/01/2021' },
    //     { description: 'Energia', amount: -24000, date: '23/01/2021' },
    //     { description: 'Energia 2', amount: -24000, date: '23/01/2021' },
    //     { description: 'Serviço 2', amount: 24000, date: '23/01/2021' },
    // ],
    add(transaction) {
        Transaction.all.push(transaction)
        App.reload()
    },
    remove(index, transaction) {
        Transaction.all.splice(index, 1)
        App.reload()
    },
    incomes() { // 1
        let income = 0;
        // pegar todas as transações
        // para cada transação,
        Transaction.all.forEach(transaction => {
            // se ela for maior que 0
            if (transaction.amount > 0) {
                income = income + transaction.amount;
            }
        })
        return income;
    },

    expenses() {
        let expense = 0;
        // pegar todas as transações
        // para cada transação,
        Transaction.all.forEach(transaction => {
            // se for menor que 0
            if (transaction.amount < 0) {
                // income = income + transaction.amount;
                expense += transaction.amount;
            }
        })
        return expense;
    },

    total() {
        // Implementar valor se for negativo o total mudar o background
        return Transaction.incomes() + Transaction.expenses();
    }

}

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {

        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr)
    },

    innerHTMLTransaction(transaction, index) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense"

        const amount = Utils.formatCurrency(transaction.amount)
        // const amount 
        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">R$ ${amount}</td>
            <td class="date">${transaction.date} </td>
            <td> <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt=""> </td>
        `
        return html
    },
    updateBalance() {
        document.getElementById('incomeDisplay').innerHTML = Utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseDiplay').innerHTML = Utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalDisplay').innerHTML = Utils.formatCurrency(Transaction.total())
    },
    clearTransactions() {
        DOM.transactionsContainer.innerHTML = ""
    }
} // mais top pegou os dados do array dividiu e passau a moeda

const Utils = {
    formatAmount(value) {
        value = Number(value) * 100
        return value
    },
    formatDate(date) {
        const splittedDate = date.split("-")
        return ` ${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]} `
    },
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""
        value = String(value).replace(/\D/g, "")
        value = Number(value) / 100
        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
        // console.log(signal + value)
        return signal + value
    }
}

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),
    getValues() {
        return {
            description: Form.description.value,
            amount: Form.amount.value,
            date: Form.date.value
        }
    },

    validateFields() {
        const { description, amount, date } = Form.getValues()

        if (description.trim() === "" ||
            amount.trim() === "" ||
            date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos")
        }
    },

    formatValues() {
        let { description, amount, date } = Form.getValues()
        amount = Utils.formatAmount(amount)
        date = Utils.formatDate(date)
        return {
            description,
            amount,
            date
        }

    },

    submit(event) {
        event.preventDefault()

        try {
            // validar os campos
            Form.validateFields()
            const transaction = Form.formatValues()
            Transaction.add(transaction)
            Modal.close()
            // formatar os dados para salvar
            // Form.formatData()
            // apagar os dados do formulario
            // fechar o modal
            // atualizar reloade
        } catch (error) {
            alert(error.message)
        }
    }
}

// Storage.get()
// Storage.set()

const App = {
    init() {
        // Transaction.all.forEach((transaction, index) => {
        //     DOM.addTransaction(transaction, index)
        //})
        Transaction.all.forEach(DOM.addTransaction)
        DOM.updateBalance()
        Storage.set(Transaction.all)
    },

    reload() {
        DOM.clearTransactions()
        App.init()
    }
}

App.init()

// Transaction.remove(1)