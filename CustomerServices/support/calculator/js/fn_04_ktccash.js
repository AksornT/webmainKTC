/* ============= :: AMORTIZATION CALCULATOR :: ============ */
// Create by AKARATE PONGSAWANG
// Version 1.0 on 28/11/2016

function Fn_PMT(pv,iy,np){
    return -fn_BA(np,iy/12,pv,null,0);
}

// View //
$(function () {
    
    var _host = $("#cal-input"),
        _result = $("#cal-result"),
        r_pmt = $("#r_pmt"),
        _pv = 0,
        _iy = 28,
        _term = 0,
        _firstrun = true;
    
    function showResult(){
        var _pmt = Fn_PMT(_pv,_iy,_term);
        
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
    
    _host.find("#info_pv").change(function(){
        _pv = +this.value;
    });
    _host.find("#info_term").change(function(){
        _term = +this.value;
    });
    _host.find(">form").submit(function(e){
        e.preventDefault();
        if(_pv*_term == 0){
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
            r_pmt.text(0);
            return false;
        }
        if(_pv<1.5e4){
            alert("วงเงินสินเชื่อต้องไม่ต่ำกว่า 15,000 บาท");
            r_pmt.text(0);
            return false;
        }
        switch(true){
            case (_pv<=3e4):
                if(_term>36){
                    alert("ระยะเวลาผ่อนชำระสูงสุด 36 เดือน");
                    r_pmt.text(0);
                    return false;
                }
                break;
            case (_pv<=1e5):
                if(_term>48){
                    alert("ระยะเวลาผ่อนชำระสูงสุด 48 เดือน");
                    r_pmt.text(0);
                    return false;
                }
                break;
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
		$("#info_pv").val("");
        r_pmt.text("0");
		$("#info_term").val("").trigger("chosen:updated");
        _pv = 0;
        _term = 0;
        _result.hide();
    });
});
