/* ============= :: AMORTIZATION CALCULATOR :: ============ */
// Create by AKARATE PONGSAWANG
// Version 1.0 on 07/11/2016

function Fn_KTCPROUD(pv,iy){
    return 0.03*pv*(1+iy/12);
}

function getCareerRate(ca,inc){
    if(ca==2){
        return 0.28;
    }
    //
    if(inc<1.2e4) return 0;
    if(inc<3e4) return 0.28;
    if(inc<5e4) return 0.27;
    if(inc<1e5) return 0.25;
    return 0.24;
}
// View //
$(function () {
    
    var _host = $("#cal-input"),
        _result = $("#cal-result"),
        _career = _host.find("#info_career"),
        r_pmt = $("#r_pmt"),
        _ca = 0,
        _inc = 0,
        _pv = 0,
        _firstrun = true;
    
    function showResult(){
        var _pmt = Fn_KTCPROUD(_pv,getCareerRate(_ca,_inc));
        
        if(_pmt>0){
            r_pmt.text(formatNumber((_pmt).fixed(0,1)));
            _result.stop().css('opacity',0).fadeTo(360,1);
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
    
    
    _career.change(function(){
        _ca = +this.value;
    });
    _host.find("#info_income").change(function(){
        _inc = +this.value;
    });
    _host.find("#info_pv").change(function(){
        _pv = +this.value;
    });

    _host.find(">form").submit(function(e){
        e.preventDefault();
        if(_ca*_pv == 0){
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            r_pmt.text(0);
            return false;
        }
        if(_inc<1.2e4){
            alert("รายได้ต้องไม่ต่ำกว่า 12,000 บาท");
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
        $("#info_income").val("");
		$("#info_pv").val("");
		$("#info_career").val("").trigger("chosen:updated");
		//$("#info_career").val(null).trigger("chosen:updated");
        r_pmt.text("0");
        //_career.val("").trigger("chosen:updated");
        _ca = 0;
        _inc = 0;
        _pv = 0;
        _result.hide();
    });
});
