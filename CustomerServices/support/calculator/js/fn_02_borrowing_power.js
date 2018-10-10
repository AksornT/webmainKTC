/* ============= :: AMORTIZATION CALCULATOR :: ============ */
// Create by AKARATE PONGSAWANG
// Version 1.0 on 31/10/2016

function Fn_effortPay(a, b) {
    if(0.4*a<=b) return 0;
    return 0.4*a-b;
}
function Fn_loanAMT(pmt,ir,np){
    return fn_BA(np,ir/12,null,-pmt,0);
}

// View //
$(function () {
    
    var _host = $("#cal-input"),
        _result = $("#cal-result"),
        r_amt = $("#r_amt"),
        r_pmt = $("#r_pmt"),
        _income = 0,
        _expense = 0,
        _iy = 0,
        _term = 0,
        _firstrun = true;
    
    function showResult(){
        var _pmt = Fn_effortPay(_income, _expense),
            _pv =  Fn_loanAMT(_pmt,_iy,_term);
        
        if(_pmt>0){
            r_amt.text(formatNumber((_pv).fixed(-4,-1)));
            r_pmt.text(formatNumber((_pmt).fixed(-1,1)));
            _result.stop().css('opacity',0).fadeTo(360,1);
        }else{
            r_amt.text("0");
            r_pmt.text("0");
            alert("รายได้ของท่านไม่เพียงพอหรือมีภาระหนี้สูง");
        }
        
    }

    $(".fx-num").forceNumber();
    $(".fx-decNum").forceDecNumber();
    $(".fx-num,.fx-decNum").focusin(function(){
        if((this.value != null) && (this.value != "")){
            this.value = convertToNumber(this.value);
            $(this).select();
        }
    }).focusout(function(){
        if((this.value != null) && (this.value != "")){
            this.value = formatNumber(this.value);
        }
    });
    
    _host.find("#info_income").change(function(){
        _income = +this.value;
    });
    _host.find("#info_dubts").change(function(){
        _expense = +this.value;
    });
    _host.find("#info_iy").change(function(){
        _iy = +this.value;
    });
    _host.find("#info_term").change(function(){
        _term = +this.value;
    });
    _host.find(">form").submit(function(e){
        e.preventDefault();
        if(_income*_iy*_term == 0){
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            r_pmt.text(0);
            return false;
        }
        if(_firstrun){
            _firstrun = false;
            _result.show();
        }

        showResult();
    })

    
    // CLR DATA //
    $("#fx-cls").click(function(e){
        e.preventDefault();
        _firstrun = true;
        _host.find("input").val("");
        r_pmt.text("0");
        r_amt.text("0");
        _income = 0;
        _expense = 0;
        _iy = 0;
        _term = 0;
        _result.hide();
    });
});
