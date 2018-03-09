 var app = {
    _grossMinMonthlyWage: 400,
    set grossMinMonthlyWage(value) {
        if (isNaN(value) || value < 0) {
            this._grossMinMonthlyWage = 0;
        } else {
            this._grossMinMonthlyWage = value;
        }
    },
    get grossMinMonthlyWage() {
        return this._grossMinMonthlyWage;
    },
    _incomeTaxPercent: 15,
    set incomeTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._incomeTaxPercent = 0;
        } else {
            this._incomeTaxPercent = value;
        }
    },
    get incomeTaxPercent() {
        return this._incomeTaxPercent;
    },
    _healthInsuranceTaxPercent: 6,
    set healthInsuranceTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._healthInsuranceTaxPercent = 0;
        } else {
            this._healthInsuranceTaxPercent = value;
        }
    },
    get healthInsuranceTaxPercent() {
        return this._healthInsuranceTaxPercent;
    },
    _socialInsuranceTaxPercent: 3,
    set socialInsuranceTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._socialInsuranceTaxPercent = 0;
        } else {
            this._socialInsuranceTaxPercent = value;
        }
    },
    get socialInsuranceTaxPercent() {
        return this._socialInsuranceTaxPercent;
    },
    _tier2PensionTaxPercent: 2,
    set tier2PensionTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._tier2PensionTaxPercent = 0;
        } else {
            this._tier2PensionTaxPercent = value;
        }
    },
    get tier2PensionTaxPercent() {
        return this._tier2PensionTaxPercent;
    },
//////////////////////////////////////////////////////
    _pensionTaxPercent: 22.3,
    set pensionTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._pensionTaxPercent = 0;
        } else {
            this._pensionTaxPercent = value;
        }
    },
    get pensionTaxPercent() {
        return this._pensionTaxPercent;
    },
    _sicknessTaxPercent: 1.4,
    set sicknessTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._sicknessTaxPercent = 0;
        } else {
            this._sicknessTaxPercent = value;
        }
    },
    get sicknessTaxPercent() {
        return this._sicknessTaxPercent;
    },
    _maternityTaxPercent: 2.2,
    set maternityTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._maternityTaxPercent = 0;
        } else {
            this._maternityTaxPercent = value;
        }
    },
    get maternityTaxPercent() {
        return this._maternityTaxPercent;
    },
    _unemploymentTaxPercent: 1.4,
    set unemploymentTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._unemploymentTaxPercent = 0;
        } else {
            this._unemploymentTaxPercent = value;
        }
    },
    get unemploymentTaxPercent() {
        return this._unemploymentTaxPercent;
    },
    _unemploymentTaxFixedTermContractPercent: 2.8,
    set unemploymentTaxFixedTermContractPercent(value) {
        if (isNaN(value) || value < 0) {
            this._unemploymentTaxFixedTermContractPercent = 0;
        } else {
            this._unemploymentTaxFixedTermContractPercent = value;
        }
    },
    get unemploymentTaxFixedTermContractPercent() {
        return this._unemploymentTaxFixedTermContractPercent;
    },
    _healthInsuranceTaxEmployerPercent: 3,
    set healthInsuranceTaxEmployerPercent(value) {
        if (isNaN(value) || value < 0) {
            this._healthInsuranceTaxEmployerPercent = 0;
        } else {
            this._healthInsuranceTaxEmployerPercent = value;
        }
    },
    get healthInsuranceTaxEmployerPercent() {
        return this._healthInsuranceTaxEmployerPercent;
    },
    _guaranteeFundTaxPercent: 0.2,
    set guaranteeFundTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._guaranteeFundTaxPercent = 0;
        } else {
            this._guaranteeFundTaxPercent = value;
        }
    },
    get guaranteeFundTaxPercent() {
        return this._guaranteeFundTaxPercent;
    },
    _longTermUnemploymentFundTaxPercent: 0.5,
    set longTermUnemploymentFundTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._longTermUnemploymentFundTaxPercent = 0;
        } else {
            this._longTermUnemploymentFundTaxPercent = value;
        }
    },
    get longTermUnemploymentFundTaxPercent() {
        return this._longTermUnemploymentFundTaxPercent;
    },
    _accidentsAtWorkTaxPercent: 0.18,
    set accidentsAtWorkTaxPercent(value) {
        if (isNaN(value) || value < 0) {
            this._accidentsAtWorkTaxPercent = 0;
        } else {
            this._accidentsAtWorkTaxPercent = value;
        }
    },
    get accidentsAtWorkTaxPercent() {
        return this._accidentsAtWorkTaxPercent;
    },

    // Neapmokestinamas pajamų dydis (NPD)
    taxExemptIncome: function (o) {
        if (o.workCapacityGroup === 25) {
            return 450;
        } else if (o.workCapacityGroup === 55) {
            return 390;
        } else if (o.grossPayAmount <= this.grossMinMonthlyWage) {
            return 380;
        } else if (o.grossPayAmount > this.grossMinMonthlyWage && o.grossPayAmount <= 1160) {
            return 380 - ((o.grossPayAmount - this.grossMinMonthlyWage) * 0.5);
        } else {
            return 0;
        }
    },
    // "Darbuotojo/autoriaus" mokesčiai:
    // Gyventojų pajamų mokestis (GPM) - 15%
    incomeTax: function (o) {
        if (o.grossPayAmount > app.taxExemptIncome(o)) {
            return (o.grossPayAmount - app.taxExemptIncome(o)) * (this.incomeTaxPercent / 100);
        } else {
            return 0;
        }
    },
    incomeTaxAuthor: function (o) {
        return o.grossPayAmountAuthor * (this.incomeTaxPercent / 100);
    },
    // Privalomasis sveikatos draudimas (PSD) - 6%
    healthInsuranceTax: function (o) {
        return o.grossPayAmount * (this.healthInsuranceTaxPercent / 100);
    },
    healthInsuranceTaxAuthor: function (o) {
        if (o.workingAuthor) {
            return o.grossPayAmountAuthor * (this.healthInsuranceTaxPercent / 100);
        } else {
            return o.grossPayAmountAuthor * 0.5 * (this.healthInsuranceTaxPercent / 100);
        }
    },
    // Valstybinis socialinis draudimas (VSD) - 3%
    socialInsuranceTax: function (o) {
        return o.grossPayAmount * (this.socialInsuranceTaxPercent / 100);
    },
    socialInsuranceTaxAuthor: function (o) {
        if (o.workingAuthor) {
            return o.grossPayAmountAuthor * (this.socialInsuranceTaxPercent / 100);
        } else {
            return o.grossPayAmountAuthor * 0.5 * (this.socialInsuranceTaxPercent / 100);
        }
    },
    // II pakopos pensijų fondas - 2%
    tier2PensionTax: function (o) {
        if (o.tier2PensionAccumulation) {
            return o.grossPayAmount * (this.tier2PensionTaxPercent / 100);
        }
        return 0;
    },
    tier2PensionTaxAuthor: function (o) {
        if (o.tier2PensionAccumulation) {
            return o.grossPayAmountAuthor * (this.tier2PensionTaxPercent / 100);
        }
        return 0;
    },
    // "Darbdavio/užsakovo" mokesčiai:
    // Sodra. (VSD + PSD)
    // Nuo metų pradžios darbdaviams atsirado prievolė "Sodros" įmokas mokėti nuo MMA ir tuomet, kai darbuotojas uždirba mažiau.
    socialAndHealthInsuranceTax: function (o) {
        var amount, percent;
        if (o.grossPayAmount > 0 && o.grossPayAmount < this.grossMinMonthlyWage && !o.insuredElsewhere) {
            amount = this.grossMinMonthlyWage;
        } else {
            amount = o.grossPayAmount
        }

        percent = this.pensionTaxPercent
            + this.sicknessTaxPercent
            + this.maternityTaxPercent
            + this.healthInsuranceTaxEmployerPercent
            + this.accidentsAtWorkTaxPercent;

        if (o.fixedTermContract) {
            percent += this.unemploymentTaxFixedTermContractPercent;
        } else {
            percent += this.unemploymentTaxPercent;
        }
        return amount * (percent / 100);
    },
    socialAndHealthInsuranceTaxAuthor: function (o) {
        var amount = 0, rate = 1;
        // Nedarbo draudimas – 1,4% (Sodra).
        // Nelaimingų atsitikimų darbe ir profesinių ligų draudimas (I, II, III, IV gr.) – 0,18%; 0,43%; 0,9%; 1,8% (Sodra).
        if (o.workingAuthor) {
            amount += o.grossPayAmountAuthor * (this.unemploymentTaxPercent / 100);
            amount += o.grossPayAmountAuthor * (this.accidentsAtWorkTaxPercent / 100);
        } else {
            rate = 0.5;
        }
        // Pensijų draudimas – 22,3% (Sodra).
        // Sveikatos draudimas – 3% (Sodra).
        // Motinystės draudimas – 2,2% (Sodra).
        // Ligos draudimas – 1,4% (Sodra).
        amount += o.grossPayAmountAuthor * rate * (this.pensionTaxPercent / 100);
        amount += o.grossPayAmountAuthor * rate * (this.healthInsuranceTaxEmployerPercent / 100);
        amount += o.grossPayAmountAuthor * rate * (this.maternityTaxPercent / 100);
        amount += o.grossPayAmountAuthor * rate * (this.sicknessTaxPercent / 100);
        return amount;
    },
    // Įmokos į garantinį fondą - 0,2%
    guaranteeFundTax: function (o) {
        return o.grossPayAmount * (this.guaranteeFundTaxPercent / 100);
    },
    // Įmoka į ilgalaikio darbo išmokų fondą - 0,5%
    longTermUnemploymentFundTax: function (o) {
        return o.grossPayAmount * (this.longTermUnemploymentFundTaxPercent / 100);
    },

    neto: {
        // Užmokestis "ant popieriaus"
        _grossPayAmount: 0,
        set grossPayAmount(value) {
            if (isNaN(value) || value < 0) {
                this._grossPayAmount = 0;
            } else {
                this._grossPayAmount = value;
            }
        },
        get grossPayAmount() {
            return this._grossPayAmount;
        },
        insuredElsewhere: false,
        fixedTermContract: false,
        tier2PensionAccumulation: false,
        workCapacityGroup: 100,

        calculateAuthorContractsTaxes: false,
        _grossPayAmountAuthor: 0,
        set grossPayAmountAuthor(value) {
            if (isNaN(value) || value < 0) {
                this._grossPayAmountAuthor = 0;
            } else {
                this._grossPayAmountAuthor = value;
            }
        },
        get grossPayAmountAuthor() {
            return this._grossPayAmountAuthor;
        },
        workingAuthor: false,

        get netPayAmount() {
            return this.grossPayAmount - app.incomeTax(this) - app.healthInsuranceTax(this) - app.socialInsuranceTax(this) - app.tier2PensionTax(this);
        },
        get netPayAmountAuthor() {
            return this.grossPayAmountAuthor - app.incomeTaxAuthor(this) - app.healthInsuranceTaxAuthor(this) - app.socialInsuranceTaxAuthor(this) - app.tier2PensionTaxAuthor(this);
        },
        get totalPayAmount() {
            return this.grossPayAmount + app.socialAndHealthInsuranceTax(this) + app.guaranteeFundTax(this) + app.longTermUnemploymentFundTax(this);
        },
        get totalPayAmountAuthor() {
            return this.grossPayAmountAuthor + app.socialAndHealthInsuranceTaxAuthor(this);
        },

        updateResult: function () {
            $("#neto .js-employeeTaxes .js-taxExemptIncome:first").text(app.currency(app.taxExemptIncome(this)));
            $("#neto .js-employeeTaxes .js-incomeTax:first").text(app.currency(app.incomeTax(this) + app.incomeTaxAuthor(this)));
            $("#neto .js-employeeTaxes .js-healthInsuranceTax:first").text(app.currency(app.healthInsuranceTax(this) + app.healthInsuranceTaxAuthor(this)));
            $("#neto .js-employeeTaxes .js-socialInsuranceTax:first").text(app.currency(app.socialInsuranceTax(this) + app.socialInsuranceTaxAuthor(this)));
            $("#neto .js-employeeTaxes .js-tier2PensionTax:first").text(app.currency(app.tier2PensionTax(this) + app.tier2PensionTaxAuthor(this)));
            $("#neto .js-employeeTaxes .js-netPayAmount:first").text(app.currency(this.netPayAmount + this.netPayAmountAuthor));
            $("#neto .js-employerTaxes .js-socialAndHealthInsuranceTax:first").text(app.currency(app.socialAndHealthInsuranceTax(this) + app.socialAndHealthInsuranceTaxAuthor(this)));
            $("#neto .js-employerTaxes .js-guaranteeFundTax:first").text(app.currency(app.guaranteeFundTax(this)));
            $("#neto .js-employerTaxes .js-longTermUnemploymentFundTax:first").text(app.currency(app.longTermUnemploymentFundTax(this)));
            $("#neto .js-employerTaxes .js-totalPayAmount:first").text(app.currency(this.totalPayAmount + this.totalPayAmountAuthor));
        }
    },

    bruto: {
        _netPayAmount: 0,
        set netPayAmount(value) {
            if (isNaN(value) || value < 0) {
                this._netPayAmount = 0;
            } else {
                this._netPayAmount = value;
            }
        },
        get netPayAmount() {
            return this._netPayAmount;
        },
        insuredElsewhere: false,
        fixedTermContract: false,
        tier2PensionAccumulation: false,
        workCapacityGroup: 100,

        calculateAuthorContractsTaxes: false,
        _netPayAmountAuthor: 0,
        set netPayAmountAuthor(value) {
            if (isNaN(value) || value < 0) {
                this._netPayAmountAuthor = 0;
            } else {
                this._netPayAmountAuthor = value;
            }
        },
        get netPayAmountAuthor() {
            return this._netPayAmountAuthor;
        },
        workingAuthor: false,

        get grossPayAmount() {
            var k1 = this.netPayAmount / (1 - (app.incomeTaxPercent / 100) - (app.healthInsuranceTaxPercent / 100) - (app.socialInsuranceTaxPercent / 100) - (this.tier2PensionAccumulation ? (app.tier2PensionTaxPercent / 100) : 0));
            var k2 = k1 - 380 + (k1 - app.grossMinMonthlyWage) * 0.5;
            var k3 = (k1 - k2) * (this.tier2PensionAccumulation ? 1.11278195 : 1.1094889);
            var taxExemptIncome = (k3 < 0) ? 0 : ((k3 > 380) ? 380 : k3);

            if (this.workCapacityGroup === 25) {
                taxExemptIncome = 450;
            } else if (this.workCapacityGroup === 55) {
                taxExemptIncome = 390;
            }

            var value = (this.netPayAmount - taxExemptIncome * (app.incomeTaxPercent / 100)) / (1 - (app.incomeTaxPercent / 100) - (app.healthInsuranceTaxPercent / 100) - (app.socialInsuranceTaxPercent / 100) - (this.tier2PensionAccumulation ? (app.tier2PensionTaxPercent / 100) : 0));
            if (value < taxExemptIncome) {
                value = this.netPayAmount / (1 - (app.healthInsuranceTaxPercent / 100) - (app.socialInsuranceTaxPercent / 100));
            }
            return value;
        },
        get grossPayAmountAuthor() {
            var rate = ((app.incomeTaxPercent / 100) + (this.workingAuthor ? ((app.healthInsuranceTaxPercent + app.socialInsuranceTaxPercent) / 100) : (0.5 * ((app.healthInsuranceTaxPercent + app.socialInsuranceTaxPercent) / 100))) + (this.tier2PensionAccumulation ? (app.tier2PensionTaxPercent / 100) : 0));
            return this.netPayAmountAuthor / (1 - rate);
        },
        get totalPayAmount() {
            return this.grossPayAmount + app.socialAndHealthInsuranceTax(this) + app.guaranteeFundTax(this) + app.longTermUnemploymentFundTax(this);
        },
        get totalPayAmountAuthor() {
            return this.grossPayAmountAuthor + app.socialAndHealthInsuranceTaxAuthor(this);
        },

        updateResult: function () {
            $("#bruto .js-employeeTaxes .js-taxExemptIncome:first").text(app.currency(app.taxExemptIncome(this)));
            $("#bruto .js-employeeTaxes .js-incomeTax:first").text(app.currency(app.incomeTax(this) + app.incomeTaxAuthor(this)));
            $("#bruto .js-employeeTaxes .js-healthInsuranceTax:first").text(app.currency(app.healthInsuranceTax(this) + app.healthInsuranceTaxAuthor(this)));
            $("#bruto .js-employeeTaxes .js-socialInsuranceTax:first").text(app.currency(app.socialInsuranceTax(this) + app.socialInsuranceTaxAuthor(this)));
            $("#bruto .js-employeeTaxes .js-tier2PensionTax:first").text(app.currency(app.tier2PensionTax(this) + app.tier2PensionTaxAuthor(this)));
            $("#bruto .js-employeeTaxes .js-grossPayAmount:first").text(app.currency(this.grossPayAmount + this.grossPayAmountAuthor));
            $("#bruto .js-employerTaxes .js-socialAndHealthInsuranceTax:first").text(app.currency(app.socialAndHealthInsuranceTax(this) + app.socialAndHealthInsuranceTaxAuthor(this)));
            $("#bruto .js-employerTaxes .js-guaranteeFundTax:first").text(app.currency(app.guaranteeFundTax(this)));
            $("#bruto .js-employerTaxes .js-longTermUnemploymentFundTax:first").text(app.currency(app.longTermUnemploymentFundTax(this)));
            $("#bruto .js-employerTaxes .js-totalPayAmount:first").text(app.currency(this.totalPayAmount + this.totalPayAmountAuthor));
        }
    },

    currency: function (value) {
        return value.toLocaleString("lt-LT", {style: "currency", currency: "EUR", minimumFractionDigits: 2});
    },
    loadSettings: function () {
        if ("localStorage" in window && localStorage !== null) {
            if ("incomeTaxPercent" in localStorage) this.incomeTaxPercent = parseFloat(localStorage.getItem("incomeTaxPercent"));
            if ("healthInsuranceTaxPercent" in localStorage) this.healthInsuranceTaxPercent = parseFloat(localStorage.getItem("healthInsuranceTaxPercent"));
            if ("socialInsuranceTaxPercent" in localStorage) this.socialInsuranceTaxPercent = parseFloat(localStorage.getItem("socialInsuranceTaxPercent"));
            if ("tier2PensionTaxPercent" in localStorage) this.tier2PensionTaxPercent = parseFloat(localStorage.getItem("tier2PensionTaxPercent"));
            if ("pensionTaxPercent" in localStorage) this.pensionTaxPercent = parseFloat(localStorage.getItem("pensionTaxPercent"));
            if ("sicknessTaxPercent" in localStorage) this.sicknessTaxPercent = parseFloat(localStorage.getItem("sicknessTaxPercent"));
            if ("maternityTaxPercent" in localStorage) this.maternityTaxPercent = parseFloat(localStorage.getItem("maternityTaxPercent"));
            if ("unemploymentTaxPercent" in localStorage) this.unemploymentTaxPercent = parseFloat(localStorage.getItem("unemploymentTaxPercent"));
            if ("unemploymentTaxFixedTermContractPercent" in localStorage) this.unemploymentTaxFixedTermContractPercent = parseFloat(localStorage.getItem("unemploymentTaxFixedTermContractPercent"));
            if ("healthInsuranceTaxEmployerPercent" in localStorage) this.healthInsuranceTaxEmployerPercent = parseFloat(localStorage.getItem("healthInsuranceTaxEmployerPercent"));
            if ("guaranteeFundTaxPercent" in localStorage) this.guaranteeFundTaxPercent = parseFloat(localStorage.getItem("guaranteeFundTaxPercent"));
            if ("longTermUnemploymentFundTaxPercent" in localStorage) this.longTermUnemploymentFundTaxPercent = parseFloat(localStorage.getItem("longTermUnemploymentFundTaxPercent"));
            if ("accidentsAtWorkTaxPercent" in localStorage) this.accidentsAtWorkTaxPercent = parseFloat(localStorage.getItem("accidentsAtWorkTaxPercent"));
        }
    },
    saveSettings: function () {
        if ("localStorage" in window && localStorage !== null) {
            localStorage.setItem("incomeTaxPercent", this.incomeTaxPercent);
            localStorage.setItem("healthInsuranceTaxPercent", this.healthInsuranceTaxPercent);
            localStorage.setItem("socialInsuranceTaxPercent", this.socialInsuranceTaxPercent);
            localStorage.setItem("tier2PensionTaxPercent", this.tier2PensionTaxPercent);
            localStorage.setItem("pensionTaxPercent", this.pensionTaxPercent);
            localStorage.setItem("sicknessTaxPercent", this.sicknessTaxPercent);
            localStorage.setItem("maternityTaxPercent", this.maternityTaxPercent);
            localStorage.setItem("unemploymentTaxPercent", this.unemploymentTaxPercent);
            localStorage.setItem("unemploymentTaxFixedTermContractPercent", this.unemploymentTaxFixedTermContractPercent);
            localStorage.setItem("healthInsuranceTaxEmployerPercent", this.healthInsuranceTaxEmployerPercent);
            localStorage.setItem("guaranteeFundTaxPercent", this.guaranteeFundTaxPercent);
            localStorage.setItem("longTermUnemploymentFundTaxPercent", this.longTermUnemploymentFundTaxPercent);
            localStorage.setItem("accidentsAtWorkTaxPercent", this.accidentsAtWorkTaxPercent);
        }
    },
    initChart: function (o, id) {
        o.chart = new Chart(id, {
            type: "pie",
            data: {
                labels: ["Suma 'į rankas'", "'Darbuotojo' mokesčiai", "'Darbdavio' mokesčiai"],
                datasets: [
                    {
                        data: [0, 0, 0],
                        backgroundColor: ["#F7464A", "#46BFBD", "#FDB45C"],
                        hoverBackgroundColor: ["#FF5A5E", "#5AD3D1", "#FFC870"]
                    }
                ]
            },
            options: {
                responsive: true
            }    
        });
    },
    updateChart: function (o) {
        if (o.chart) {
            o.chart.data.datasets[0].data =
            [
                (o.grossPayAmount + o.grossPayAmountAuthor).toFixed(2),
                (this.incomeTax(o) + this.incomeTaxAuthor(o) + this.healthInsuranceTax(o) + this.healthInsuranceTaxAuthor(o) + this.socialInsuranceTax(o) + this.socialInsuranceTaxAuthor(o) + this.tier2PensionTax(o) + this.tier2PensionTaxAuthor(o)).toFixed(2),
                (this.socialAndHealthInsuranceTax(o) + this.socialAndHealthInsuranceTaxAuthor(o) + this.guaranteeFundTax(o) + this.longTermUnemploymentFundTax(o)).toFixed(2)
            ];
            o.chart.update();
        }
    }
};


$(document).ready(function() {
    app.initChart(app.neto, "neto-pie-chart");
    app.initChart(app.bruto, "bruto-pie-chart");

    app.loadSettings();
    $("#settings .js-incomeTax-percent:first").val(app.incomeTaxPercent);
    $("#settings .js-healthInsuranceTax-percent:first").val(app.healthInsuranceTaxPercent);
    $("#settings .js-socialInsuranceTax-percent:first").val(app.socialInsuranceTaxPercent);
    $("#settings .js-tier2PensionTax-percent:first").val(app.tier2PensionTaxPercent);
    $("#settings .js-pensionTax-percent:first").val(app.pensionTaxPercent);
    $("#settings .js-sicknessTax-percent:first").val(app.sicknessTaxPercent);
    $("#settings .js-maternityTax-percent:first").val(app.maternityTaxPercent);
    $("#settings .js-unemploymentTax-percent:first").val(app.unemploymentTaxPercent);
    $("#settings .js-unemploymentTaxFixedTermContract-percent:first").val(app.unemploymentTaxFixedTermContractPercent);
    $("#settings .js-healthInsuranceTaxEmployer-percent:first").val(app.healthInsuranceTaxEmployerPercent);
    $("#settings .js-guaranteeFundTax-percent:first").val(app.guaranteeFundTaxPercent);
    $("#settings .js-longTermUnemploymentFundTax-percent:first").val(app.longTermUnemploymentFundTaxPercent);
    $("#settings .js-accidentsAtWorkTax-percent:first").val(app.accidentsAtWorkTaxPercent);


    $("#neto .js-calculateAuthorContractsTaxes:first").prop("checked", false);
    $("#neto .js-grossPayAmountAuthor:first").val(0);
    $("#neto .js-calculateAuthorContractsTaxes:first").on("change", function() {
        if (app.neto.calculateAuthorContractsTaxes) {
            app.neto.calculateAuthorContractsTaxes = false;
            $("#neto .js-grossPayAmountAuthor:first").val(0);
            $("#neto .js-calculateAuthorContractsTaxesContainer:first").hide();
        } else {
            app.neto.calculateAuthorContractsTaxes = true;
            $("#neto .js-calculateAuthorContractsTaxesContainer:first").show();
        }
    });

    $("#neto input").on("input", function() {
        app.neto.grossPayAmount = parseFloat($("#neto .js-grossPayAmount:first").val().replace(",","."));
        app.neto.insuredElsewhere = $("#neto .js-insuredElsewhere:first").is(":checked");
        app.neto.fixedTermContract = $("#neto .js-fixedTermContract:first").is(":checked");
        app.neto.tier2PensionAccumulation = $("#neto .js-tier2PensionAccumulation:first").is(":checked");
        app.neto.workCapacityGroup = parseInt($("#neto input[name=neto-workCapacityGroup]:checked").val());

        app.neto.grossPayAmountAuthor = parseFloat($("#neto .js-grossPayAmountAuthor:first").val().replace(",","."));
        app.neto.workingAuthor = $("#neto .js-workingAuthor:first").is(":checked");
        app.neto.updateResult();
        app.updateChart(app.neto);
    });


    $("#bruto .js-calculateAuthorContractsTaxes:first").prop("checked", false);
    $("#bruto .js-netPayAmountAuthor:first").val(0);
    $("#bruto .js-calculateAuthorContractsTaxes:first").on("change", function() {
        if (app.bruto.calculateAuthorContractsTaxes) {
            app.bruto.calculateAuthorContractsTaxes = false;
            $("#bruto .js-netPayAmountAuthor:first").val(0);
            $("#bruto .js-calculateAuthorContractsTaxesContainer:first").hide();
        } else {
            app.bruto.calculateAuthorContractsTaxes = true;
            $("#bruto .js-calculateAuthorContractsTaxesContainer:first").show();
        }
    });

    $("#bruto input").on("input", function() {
        app.bruto.netPayAmount = parseFloat($("#bruto .js-netPayAmount:first").val().replace(",","."));
        app.bruto.insuredElsewhere = $("#bruto .js-insuredElsewhere:first").is(":checked");
        app.bruto.fixedTermContract = $("#bruto .js-fixedTermContract:first").is(":checked");
        app.bruto.tier2PensionAccumulation = $("#bruto .js-tier2PensionAccumulation:first").is(":checked");
        app.bruto.workCapacityGroup = parseInt($("#bruto input[name=bruto-workCapacityGroup]:checked").val());

        app.bruto.netPayAmountAuthor = parseFloat($("#bruto .js-netPayAmountAuthor:first").val().replace(",","."));
        app.bruto.workingAuthor = $("#bruto .js-workingAuthor:first").is(":checked");
        app.bruto.updateResult();
        app.updateChart(app.bruto);
    });


    $("#settings input").on("input", function() {
        app.incomeTaxPercent = parseFloat($("#settings .js-incomeTax-percent:first").val().replace(",","."));
        app.healthInsuranceTaxPercent = parseFloat($("#settings .js-healthInsuranceTax-percent:first").val().replace(",","."));
        app.socialInsuranceTaxPercent = parseFloat($("#settings .js-socialInsuranceTax-percent:first").val().replace(",","."));
        app.tier2PensionTaxPercent = parseFloat($("#settings .js-tier2PensionTax-percent:first").val().replace(",","."));

        app.pensionTaxPercent = parseFloat($("#settings .js-pensionTax-percent:first").val().replace(",","."));
        app.sicknessTaxPercent = parseFloat($("#settings .js-sicknessTax-percent:first").val().replace(",","."));
        app.maternityTaxPercent = parseFloat($("#settings .js-maternityTax-percent:first").val().replace(",","."));
        app.unemploymentTaxPercent = parseFloat($("#settings .js-unemploymentTax-percent:first").val().replace(",","."));
        app.unemploymentTaxFixedTermContractPercent = parseFloat($("#settings .js-unemploymentTaxFixedTermContract-percent:first").val().replace(",","."));
        app.healthInsuranceTaxEmployerPercent = parseFloat($("#settings .js-healthInsuranceTaxEmployer-percent:first").val().replace(",","."));
        app.guaranteeFundTaxPercent = parseFloat($("#settings .js-guaranteeFundTax-percent:first").val().replace(",","."));
        app.longTermUnemploymentFundTaxPercent = parseFloat($("#settings .js-longTermUnemploymentFundTax-percent:first").val().replace(",","."));
        app.accidentsAtWorkTaxPercent = parseFloat($("#settings .js-accidentsAtWorkTax-percent:first").val().replace(",","."));

        app.saveSettings();
        app.neto.updateResult();
        app.bruto.updateResult();
        app.updateChart(app.neto);
        app.updateChart(app.bruto);
    });
});
