var defaultReports = [{
    reportName: 'reportName1'
}, {
    reportName: 'reportName2'
}, {
    reportName: 'reportName3'
}, {
    reportName: 'reportName4'
}]

var subReports = [{
    reportName: 'reportName1',
    subreportName: 'subreportNameA'
}, {
    reportName: 'reportName1',
    subreportName: 'subreportName2'
}, {
    reportName: 'reportName1',
    subreportName: 'subreportName3'
}, {
    reportName: 'reportName2',
    subreportName: 'subreportName1'
}, {
    reportName: 'reportName2',
    subreportName: 'subreportName2'
}]

var reportMenu = $('<div/>', {
    class: 'reportMenu'
}).append(function () {
    var divList = [];

    divList.push($('<div/>', {
        class: 'div_defaultReport'
    })
        .css({
        position: 'absolute',
        top: '5px'
    })
        .html('Reports').click(function (event) {
        var e = $(event.target).parent();
        setTimeout(function () {
            if ((typeof e.data('open') === 'undefined') || (e.data('open') == false)) {
                e.data('open', true);
                $(e).stop(true, true).animate({
                    height: '165px'
                }, {
                    easing: 'easeOutElastic',
                    duration: '500',
                    always: function () {
                        $(e).css({
                            overflow: 'visible'
                        })
                    }
                })
            } else {
                e.data('open', false);
                $(e).stop(true, true).animate({
                    height: '0px'
                }, {
                    easing: 'easeOutQuart',
                    duration: '500',
                    always: function () {
                        $(e).css({
                            overflow: 'hidden'
                        })
                    }
                })
            }
        }, 0)
    }))

    $(defaultReports).each(function (i, e) {
        divList.push(_div_defaultReport(e));
    });
    return divList;
})

//Returns a single subReport item with it's 
    function _div_defaultReport(e) {




        // build subReport array
        var srArray = []
        $(subReports).each(function (i, o) {
            if (e.reportName == o.reportName) {
                srArray.push($('<div/>', {
                    class: 'div_subReport'
                }).html(o.subreportName).css({
                    marginTop: (i == 0) ? '10px' : '',
                    borderTopRightRadius: (i == 0) ? '10px' : ''
                }))

            }
        });

        return $('<div/>', {
            class: 'div_defaultReport'
        }).html(e.reportName).data('subs', srArray).click(function (event) {

            //Stops click events if the target (control clicked on by the user) isn't a div_defaultReport
            if ($(event.target).attr('class') !== 'div_defaultReport') {
                event.stopPropagation();
                return false
            };

            var e = $(this)
            setTimeout(function () {
                if ((typeof e.data('open') === 'undefined') || (e.data('open') == false)) { //Toggle click
                    e.data('open', true);

                    //store original width (once)
                    if (typeof e.data('_width') === 'undefined') {
                        e.data('_width', e.width())
                    };

                    $('.div_defaultReport').each(function (i, defRow) {

                        if ($(defRow).width() !== $(defRow).data('_width') && !(typeof $(defRow).data('_width') === 'undefined')) {

                            $(defRow).stop(true, true)
                                .animate({
                                width: $(defRow).data('_width') + 'px'
                            }, {
                                easing: 'easeOutElastic',
                                duration: 1000,
                                start: function () {
                                    $('.div_formatItemList').remove()
                                },
                                always: function () {
                                    $(defRow).data('open', false)
                                }
                            })


                        }
                    })

                    e.stop(true, true)
                        .animate({
                        width: e.parent().width() - 13 + 'px'
                    }, {
                        easing: 'easeInQuart',
                        duration: 150,
                        complete: function () {
                            e.append($('<div/>', {
                                class: 'div_formatItemList'
                            }).css({
                                left: e.parent().outerWidth() + 'px'
                            })
                                .append(function () {
                                var list = []
                                $(e.data('subs')).each(function (i, sub) {
                                    sub = sub.click(function () {

                                    })
                                    list.push(sub)
                                });
                                return list;
                            })
                                .stop(true, true, true).animate({
                                width: 175 + 'px'
                            }, {
                                easing: 'easeOutElastic',
                                duration: 800
                            }))
                        }
                    })
                } else { //Toggle
                    e.data('open', false);

                    $('.div_formatItemList').stop(true,true).animate({
                        width: '0px'
                    }, {
                        easing: 'easeInQuart',
                        duration: 250,
                        always: function () {
                            $('.div_formatItemList').remove()
                            e.stop(true, true, true).animate({
                                width: e.data('_width') + 'px'
                            }, {
                                easing: 'easeOutElastic',
                                duration: 1000
                            })                            
                        }
                    })

                }
            }, 0);
        })
    }





$('body').append(reportMenu)
    .append(
$('<div/>')
    .css({
    position: 'absolute',
    top: '0px',
    right: '0px',
    width: '20px',
    height: '20px',
    backgroundColor: 'black'
})
    .click(function () {
    console.log($('.reportMenu').outerHeight())
}))
