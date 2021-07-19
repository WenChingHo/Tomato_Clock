let default_time = 1500; //seconds
let default_title = "tomato clock"
/*____________________________________________________________
                    Draw Icons on .dotCirlce 
______________________________________________________________*/
var radius = 0;
var fields = $('.itemDot'); //check how many buttons there are
var container = $('.dotCircle');
var width = container.width(); //500
radius = width / 2.5;
var height = container.height();
var angle = 10;
var inital_position = []; //to return to this position
var step = (2 * Math.PI) / fields.length; //distant(rad) between each button
fields.each(function () {
    var x = Math.round(width / 2 + radius * Math.cos(angle) - $(this).width() / 2);
    var y = Math.round(height / 2 + radius * Math.sin(angle) - $(this).height() / 2);

    inital_position.push([`${x}`, `${y}`])
    $(this).css({
        left: x + 'px',
        top: y + 'px',
        transition: '1.25s'
    });
    angle += step; //adds the distance between each buttons (in rad) after one is drawn
});


/*_________________________________________________________________
                   Screen Change Functions/Animations    
___________________________________________________________________*/
let fly_button = function (ele, i, top_offset, rotate) {
    setTimeout(function () {
        $('.dotCircle').css({
            "transform": "rotate(" + (720 + (rotate - 2) * 36) + "deg)",
            "transition": "1.5s ease-out",
        });
        $(ele).css({
            "transform": `translate(0px,${top_offset}px)`,
            "transition": "1.5s ease-in",
        })
    }, i)
    setTimeout(function () {
        $(ele).css({
            "top": `${top_offset}px`,
            "transition": "1s ease-out",
        })
    }, i)
}
function blur_background() {
    $('.round_change').toggleClass('blur');
    $('i').toggleClass('blur');
    $('text').toggleClass('blur');
}

function too_many_toggles() {
    $('.itemDot4 i').toggleClass('music_color');
    $('.contentCircle h2').toggleClass('font_zero');
    $('.contentCircle p').toggleClass('font_zero');
    $('.contentCircle .CirItem i ').toggleClass('display_none');
    $('.toClick').toggleClass('display_none');
}
function toggle_music_screen() {
    $('.dotCircle').toggleClass('dot_circle_shrink');
    $('.itemDot').toggleClass('music_button_stack');
    too_many_toggles();
}
function toggle_timer_screen(interval = 0) {

    setTimeout(function () {
        $('.contentCircle .CirItem i ').toggleClass('opacity_zero transition_zero')
        $('.contentCircle p').toggleClass('font_zero');
        $('.contentCircle h2').toggleClass('font_zero');

    }, interval)

    $('.dotCircle').toggleClass('opacity_zero');
    $('.on_off').toggleClass('opacity_zero');
    $('#text_timer').toggleClass('opacity_zero')
    $('svg').toggleClass('svg_zindex');
    $('.itemDot').toggleClass('opacity_zero');

}
function day_end_screen() {
    clearInterval(inter);
    toggle_timer_screen();
    $('.contentCircle .CirItem i ').toggleClass('display_none transition_zero')
    $('.contentCircle p').toggleClass('display_none');
    $('.contentCircle h2').toggleClass('display_none');
    $('.round').removeClass('round').addClass('round_change')
    $('.music_selection').toggleClass("display_none")
    $('.toClick').toggleClass("display_none")
    $('.dotCircle').toggleClass('opacity_zero');
    $('svg').toggleClass('svg_zindex');
    $('.itemDot').toggleClass('opacity_zero');
    blur_background()
}
function call_survery_form() {
    $('#text_timer').text('0:00');
    $('.on_off').addClass("display_none");
    refresh.classList.remove("display_none");
    // window.alert("Time's up!")
    set_Progress(bar, 0)
    clearInterval(countdown_interval);
    /*  form popout */
    blur_background();
    setTimeout(function () {
        $('#selection_box').addClass('selection_form_animation1')

    }, 800)
    setTimeout(function () {
        $('#selection_box').addClass('selection_form_animation2')
        $('#selection_box').css('height', `670px`)
    }, 1050)
    setTimeout(function () {
        $('form').toggleClass('opacity_zero')
    }, 1150)
}
function call_timer_screen() {
    clearInterval(inter);
    $('.round').removeClass('round').addClass('round_change');
    toggle_timer_screen();
    set_Progress(sml, 100);
    set_Progress(lrg, 100);
    $('.progress_bar_effect').css({
        'transition': ' all 0.01s',
        'opacity': '0',
        'stroke-width': '19px'
    });
    progress_bar_start_animation();
}
function initialize_timer_setting(forced_default_time = default_time) {
    default_time = forced_default_time;
    time_paused = 0;
    start_time_stamp = 0;
    remain = default_time;
    $('#bar').css('stroke', `rgba(129, 27, 120, ${remain / default_time * 0.35 + 0.1})`) //change progress bar color opacity
    $('#text_timer').text(`${Math.floor(default_time / 60)}:${String(Math.floor((default_time % 60))).padStart(2, '0')}`)

}
function initialize_notecards(){
        directions = [{
            "id":0,
            "time": '1',
            "topic":"Features",
            "desc": "These notecards are color-coded based on topics! "
            },
        {
            "id":1,
            "time":"2",
            "topic": "Features",
            "desc": "You can press the 'pencil' to edit the content, and you can press the 'garbage' to delete this notecard. The check on the top right is to remove the notecard once you've finished reviewing it **this session**. It will come back if you re-enter this page."
            },
        {
            "id":2,
            "time": "3",
            "topic": "Welcome to Notes Review!",
            "desc": "Once the tomato clock runs out, a survey will pop out and ask you to summarize **three** things you've learned during this session."
            
        }]    
    if (window.localStorage.length == 0) {
        for (var index=0; index < 3; index++){
        localStorage.setItem(index, JSON.stringify(directions[index]))
        console.log(directions[i])
        }
    }
}

function initialize_progress_bar() {
    $('.progress_bar').css({
        'opacity': '1',
        'transition': 'all 1.75s',
        'stroke': 'rgba(129, 27, 120,0.45)',
        'stroke-width': '55px',
        'fill': 'transparent'
    })
    $('#start_cd').addClass('cur_on'); //print start button

    //show the solid line
    set_Progress(bar, remain / default_time * 100);
}

function progress_bar_start_animation() {
    set_Progress(bar, 0) //iniitalize progress bar to 0
    setTimeout(function () { //progress bar animation
        initialize_progress_bar()

    }, 400)

    setTimeout(function () {
        $('.progress_bar_effect').css({
            'opacity': '1',
            'transition': 'all 1.75s',
            'stroke': 'rgba(129, 27, 120,0.2)',
            'stroke-width': '7px',
            'fill': 'transparent'
        })

        // $('text').css('opacity', '1')
        //print out the solid line so it can disappear later
        set_Progress(sml, 0);
        set_Progress(lrg, 0);
    }, 180)
}

/*____________________________________________________________
                   Icons Selection Animations
                   Music Button Return Functon
______________________________________________________________*/
let is_music_screen = false;
$('.itemDot').click(function () {
    if (not_homepage) { //Return from music selection to home screen
        not_homepage = false;
        is_music_screen = false;
        toggle_music_screen()
        set_auto_rotate();
        $('.round').css('opacity', '1');
        $('.music_selection div').each(function (index) {
            $(this).css({
                'transform': "rotate(-93deg)",
                'opacity': '0',
                'transition': '1s'
            })
        })
    }
    var dataTab = $(this).data("tab");
    $('.itemDot').removeClass('active');
    $(this).addClass('active');
    $('.CirItem').removeClass('active');
    $('.CirItem' + dataTab).addClass('active');
    i = dataTab;

    $('.dotCircle').css({ //rotate the circle. Will cause the icon to tilt sideways
        "transform": "rotate(" + (360 - (i - 1) * 36) + "deg)",
        "transition": "2s"
    });
    $('.itemDot').css({ //rotate button to match the offset created 
        "transform": "rotate(" + ((i - 1) * 36) + "deg)",
        "transition": "1.5s"
    });
});


/*____________________________________________________________
                   5 Second Automatic Switch
______________________________________________________________*/
const maxData = 4;
let i = 2;
let inter;
function set_auto_rotate() {
    inter = setInterval(function () {
        var dataTab = $('.itemDot.active').data("tab");

        if (dataTab > maxData || i > maxData) {
            dataTab = 1;
            i = 1;
        }
        $('.itemDot').removeClass('active');
        $('[data-tab="' + i + '"]').addClass('active');
        $('.CirItem').removeClass('active');
        $('.CirItem' + i).addClass('active');
        i++;

        $('.dotCircle').css({
            "transform": "rotate(" + (360 - (i - 2) * 36) + "deg)",
            "transition": "2s"
        });
        $('.itemDot').css({
            "transform": "rotate(" + ((i - 2) * 36) + "deg)",
            "transition": "1.5s"
        });

    }, 5000);
}

set_auto_rotate()
initialize_notecards()
let response = [];
let response_size = localStorage.length;
for (let t = 0; t < response_size; t++) {
    response.push(JSON.parse(localStorage.getItem(t)))
}

/*_________________________________________________________________
                Button Hover Effects and Click Events
___________________________________________________________________*/
$('#music_but').mouseenter(function () { $(this).find('i').css('color', 'rgb(255, 255, 255)') })
$('#music_but').mouseleave(function () { $(this).find('i').css('color', 'orange') })
$('.toClick').on('mouseenter', function () {
    $('.contentCircle .CirItem i ').css('left', '70%')
    $('.round').css('background-color', 'rgba(213, 139, 226, 0.08)')
})
$('.toClick').on('mouseleave', function () {
    $('.contentCircle .CirItem i ').css('left', '55%')
    $('.round').css('background-color', 'white')
})
// $('.toClick').on('mousedown', function () { $('.round').css('box-shadow', '1px 1px 1px 0.5px black') })

/*_________________________________________________________________
                    Circular progress Bar        
___________________________________________________________________*/

//Circular progress bar - Defualt without alteration
let rad = 0;
let circumference = 0;
let offset;
// strokeDasharry([length] [gap])
/* 
By setting the length and gap to the same length of a circumference, 
each segment covers the whole line and the gap spans wide enough to
make the line invisible if it's the part the are shown. With this,      
we can now use "strokeDashoffset" to decide "where" the SVG line starts, 
which creates an illustion of it's being drawn.
*/

//Set where the progress bar is at
function set_Progress(ele, numerator) {
    circumference = parseFloat(ele.style.strokeDasharray);
    offset = circumference - numerator / 100 * circumference;
    ele.style.strokeDashoffset = offset;
}

//initial Animation of forming the circle
$('circle').each(function () {
    rad = this.r.baseVal.value;
    circumference = rad * 2 * Math.PI;
    this.style.strokeDasharray = `${circumference} ${circumference}`;
    this.style.strokeDashoffset = `${circumference}`;
    set_Progress(this, 100) //initialize progress bar effect circle
})


/*___________________________________________________________________________
                    routes+settings for different displays
______________________________________________________________________________*/
let is_clock_display = false;
let is_custom = false;
let not_homepage = false;
let is_day_end = false;
let interval_started = false; /* used to prevent duplicating events*/
//three more line below 327,328,330
$('.toClick').on('mouseup', avoid_dup_event = function (event) {
    not_homepage = true;
    if (submitted) {
        initialize_timer_setting(remain || default_time);
        submitted = false;
    }
    if (!response) { return; }
    clearInterval(inter)
    //Case 1: Enter Music Selection Mode
    if (music_but.classList.contains('active')) {
        is_music_screen = true;
        toggle_music_screen();
        clearInterval(inter);
        $('.round').css({
            'opacity': '0',
            'background-color': 'white'
        });
        $('.music_selection i').css('display', 'block')
        $('.music_selection div').css('display', 'block')


        /*=============== Draw the four cones ================*/
        const color = ['0.15', '0.25', '0.36', '0.46'];
        const float = ['left', 'right', 'right', 'left'];
        setTimeout(function () {
            $('.music_selection div').each(function (index) {
                $(this).css({
                    'transition': '0.75s',
                    'border-top-left-radius': '100%',
                    'background-color': `rgba(100, 1, 120, ${color[index]})`,
                    'transform': "rotate(" + ((index) * 90 + 3) + "deg)",
                    'float': `${float[index]}`,
                    'opacity': '1',
                    'z-index': '50',
                    'box-shadow': `3px 4px 0px 0px rgba(0, 0, 0, ${color[index]}) `,
                    'border': `1px solid rgba(100, 1, 120, ${color[index]}`
                }).addClass(`music_selection_div${index}`)
            })

        }, 50)
        return;
    }
    //Enter countdown mode (default+custom)

    //Avoid constant spamming to cause actions to be fired before all the transitions are done.

    //------- Flying button onclick ----------/   
    var i = 200;
    $('.itemDot').each(function () {
        fly_button(this, i, -1000, 30);
        i += 50;
    });
    var j = 300;
    $('.itemDot').each(function () {
        fly_button(this, j, -1000, 30);
        j += 100;
    });
    //end of day review
    if (day_end.classList.contains('active')) {
        $('.sort').toggleClass("opacity_zero")
        let last_sorted_clicked = false;
        is_day_end = true;
        setTimeout(day_end_screen, 400)
        var t_date = $('#text_timer').text(`${(String(new Date().getMonth() + 1)).padStart(2, '0')}/${new Date().getDate()}`)
        let topics = ["welcome to Notes Review!", "Features"];
        let matching_color = ['rgba(207, 162, 200, 1)', 'rgba(227, 142, 180,0.6)'];
        let color_code = 0;  //change opacity automatically
        let color_index = 0;
        let remainder = 0;
        let reserve = [[207, 162, 200], [227, 142, 180] /*purple*/] //Add color theme here
        for (var iter = 0; iter < response.length; iter++) {
            let newDiv = document.createElement("div");
            let newTitle = document.createElement('h3');
            let newdesc = document.createElement('pre');
            let newhr = document.createElement('hr');
            let newedit = document.createElement('i');
            let newedit1 = document.createElement('i');
            let newedit2 = document.createElement('i');
            let newid = document.createElement('p');
            $(newedit).attr("class", "edit_trash far fa-trash-alt")
            $(newedit1).attr("class", "edit_edit far fa-edit")
            $(newedit2).attr("class", "edit_check fas fa-check")
            newTitle.innerText = `${response[iter].topic}`;
            newdesc.innerText = `${response[iter].desc}`;
            newid.innerText = response[iter].id;
            $(newid).css({ "display": "none", "position": "absolute", "width ": "0"})
            //Unique
            if (!topics.find(element => element == newTitle.innerText)) {
                topics.push(newTitle.innerText);
                let opacity = 0.20 * color_index + 0.40 + remainder;

                if (opacity > 1) {
                    remainder = opacity - 1;
                    color_code++;
                    color_index = 0;
                }
                if (color_code >= reserve.length) { color_code = 0; }

                matching_color.push(`rgba(${reserve[color_code][0]}, ${reserve[color_code][1]}, ${reserve[color_code][2]},${0.1 * color_index + 0.3}`)
                color_index++;

            }
            $(newDiv).append(newedit, newedit1, newedit2, newTitle, newhr, newdesc, newid).css({
                'top': Math.floor(Math.random() * 30 + 150),/*`-${-140 + iter * 220 + Math.floor(Math.random() * 20 - 10)}px`*/
                // 'left': Math.floor(Math.random() * 25 - 25),/*`-${-140 + iter * 220 + Math.floor(Math.random() * 20 - 10)}px`*/
                'background-color': `${matching_color[topics.indexOf(newTitle.innerText)]}`,
                'opacity': '1'
            }).attr('id', `Review${iter}`);
            $('#reserved').append(newDiv);
        }
        //transition to show the notecards

        let div_height = $('#reserved div').height() + 30;
        let div_margin = 20;
        function reverse_sort() {
            let dist = 0;
            $($("#reserved div").get().reverse()).each(function () {
                $(this).css({
                    // 'top':`${dist * 180}px`,
                    'top': dist * div_height + div_margin + "px",
                    'transition-delay': `${dist * (0.42 / response.length)}s`,
                    'box-shadow': '4px 4px 10px 2px rgb(54, 8, 54)'
                })
                dist++;
            })
        }
        reverse_sort()
        
        function reserve_div_transition_behavior() {
            if (last_sorted_clicked == false) {
                reverse_sort();
                return;
            }
            if (last_sorted_clicked == "time") {
                document.getElementById('s_time').click()
                return;
            }
            document.getElementById('s_topic').click();
        }

        $('.edit_check').on("mouseup", function () {
            $(this).parent().remove();
            reserve_div_transition_behavior()
        })
        $('.edit_trash').on("mouseup", function () {
            if (confirm('Are you sure you want to permanently delete this?')) { } else { return; }
            let this_id = $(this).siblings('p').text()
            $(this).parent().remove();

            // delete from stroage
            let map = response.map(a => a.id)
            response.splice(map.findIndex(a => a == this_id), 1)
            localStorage.removeItem(this_id);

            // reorder the storage to make index match
            localStorage.clear();
            for (var w = 0; w < response.length; w++) {
                response[w].id = w;
                localStorage.setItem(w, JSON.stringify(response[w]))
            }
            reserve_div_transition_behavior()
        })
        function edit_save() {
            $('.edit_edit').on('mouseup', function () {
                $('.edit_edit').off(); //avoid another instances
                let cur_index = $(this).siblings('p').text();
                $(this).siblings("pre, h3").attr("contenteditable", 'true')
                $(this).removeClass("edit_edit far fa-edit").addClass("edit_save far fa-save")
                var tab_function = $('[contenteditable]').on('keydown', function (e) {
                    if (e.keyCode == 9) {
                        e.preventDefault();
                        document.execCommand('insertHTML', false, '&#009');
                    }
                    if (e.keyCode === 13) {  //change enter => newdiv into enter => br
                        // insert 2 br tags (if only one br tag is inserted the cursor won't go to the next line)
                        document.execCommand('insertHTML', false, '<br><br>');
                        // prevent the default behaviour of return key pressed
                        return false;
                    }
                }).css('white-space', 'pre-wrap');
                console.log($(this).siblings("pre").html())
                const editorEle = document.querySelector('[contenteditable]');
                console.log(editorEle)
                // Handle the `paste` event
                
                $('.edit_save').on('mouseup', function () {
                    $(this).removeClass("edit_save far fa-save").addClass("edit_edit far fa-edit")
                    $(this).parent().css('background-color', `${matching_color[topics.indexOf($(this).siblings('h3').text())]}`)
                    response[cur_index].topic = $(this).siblings('h3').text();
                    response[cur_index].desc = $(this).siblings('pre').html().replaceAll("<br>", "\n").replaceAll("&lt;", "<").replaceAll("&gt;", ">").replaceAll("&amp;","&");
                    localStorage.setItem(cur_index, JSON.stringify(response[cur_index]))
                    response.splice(cur_index, 1, JSON.parse(localStorage.getItem(cur_index)))
                    $(this).siblings("pre, h3").attr("contenteditable", 'false')
                    edit_save();
                    $('[contenteditable]').off();
                })
            })
        }
        edit_save();

        $('.sort').on('click', function () {
            var time_iter = 0;
            //Sort by time
            if (this == s_time) {
                last_sorted_clicked = "time"
                $('#reserved div').each(function () {
                    $(this).css("top", div_height * time_iter + div_margin + "px")
                    time_iter++;
                })
                return;
            }
            //Sort by topics
            let sorted_topic = topics.sort()

            for (ele of sorted_topic) {
                last_sorted_clicked = "topic"
                $("#reserved div").each(function () {
                    if ($(this).find('h3').text() === ele) {
                        $(this).css("top", div_height * time_iter + div_margin + "px")
                        time_iter++;
                    }
                })

            }
        })
        return;
    }
    if (!event.detail || event.detail == 1) {
        is_clock_display = true;
        call_timer_screen();

    }
    //custom timer
    $('#text_timer').text(`${Math.floor(remain / 60)}:${String(Math.floor((remain % 60))).padStart(2, '0')}`)
    if (custom_but.classList.contains('active')) {
        is_custom = true;

        var scroll;
        var mouse_enter;
        $('.custom').toggleClass(' display_none');
        setTimeout(function () {
            $('.custom').toggleClass(' opacity_zero');
        }, 500)

        $('svg').on('mouseenter', mouse_enter = function (event) {
            //scroll event to adjust time
            event.stopPropagation(); //stop page scroll behavior
            if (!interval_started) {
                interval_started = true;
                window.addEventListener("wheel", scroll = function (e) {
                    if ($('#pause_but').hasClass("cur_on")) { return; } //disable change when its running
                    if ($('.custom').hasClass('opacity_zero')) {
                        is_custom = true;
                        $('.custom').toggleClass('opacity_zero display_none')
                    };
                    e.preventDefault();
                    if (e.deltaY < 0 && default_time < 3599) { default_time++ };
                    if (e.deltaY > 0 && default_time > 5) { default_time-- };
                    remain = default_time;
                    time_paused = 0;
                    $('#text_timer').text(`${Math.floor(default_time / 60)}:${String(Math.floor((default_time % 60))).padStart(2, '0')}`)
                    $('#bar').css('stroke', `rgba(129, 27, 120, 0.45`) //change progress bar color opacity
                    set_Progress(bar, 100);
                }, { passive: false })
            }
        })
        $('svg').mouseleave(function (event) {
            interval_started = false;
            window.removeEventListener("wheel", scroll);
            svg_id.removeEventListener("mouseenter", mouse_enter)
        })

        //Preset 25min timer

    }
    else {
        $('svg').off("mouseenter");
        (remain == default_time ||default_time>1500) ? initialize_timer_setting(1500) : null;
    }
}); //end of switching display




/*_________________________________________________________________
                    Custom button function       
___________________________________________________________________*/
$('.custom').on('mousedown', function () {
    if (remain >= 5 && remain <= 3599) {
        $(this).hasClass('custom1') ? default_time += 180 : default_time -= 180;
        if (default_time <= 5) { default_time = 5; }
        if (default_time >= 3600) { default_time = 3599; }
        remain = default_time;
        time_paused = 0;
        $('#text_timer').text(`${Math.floor(remain / 60)}:${String(Math.floor((remain % 60))).padStart(2, '0')}`)
    }
    $(this).toggleClass("box_shadow_none");
})
$('.custom').on('mouseup', function () {
    $(this).removeClass("box_shadow_none");
})
$('.custom').on('mouseleave', function () {
    $(this).removeClass("box_shadow_none");
})



/*__________________________________________________________________
                    Music button Selected Animation       
___________________________________________________________________*/
let last_pressed = 0;
$('.music_selection div').on('click', function () {
    if (not_homepage == false) { return; } //only responde when it's in music selection page
    let index = this.id[6];
    if (last_pressed == index) {
        $('.music_selection div').removeClass('music_selected music_deselected');
        $(`.music_sel i`).removeClass('background_white');
        last_pressed = 0;
        return;
    }
    $('.music_selection div').removeClass('music_selected').addClass('music_deselected')
    $(`.music_sel i`).removeClass('background_white');
    $(`#music_${index}`).toggleClass('music_deselected music_selected')
    $(`#music_${index} i`).toggleClass('background_white');
    $(`#sound_${index}`).attr('src', 'https://www.youtube.com/embed/eKFTSSKCzWA&autoplay=1')
    last_pressed = index;
});


/*_________________________________________________________________
                    Countdown Functions       
___________________________________________________________________*/

let countdown = false;
let survey = false;
let start_time_stamp = 0;
let time_paused = 0;
let remain = default_time;
let difference = 0;

function pause() {
    clearInterval(countdown_interval);
    time_paused += difference;
    start_time_stamp = 0; //reset initial counter
    countdown = false;
}

$('svg').on('click', function () {
    // if (is_custom) {
    //     is_custom = false;
    //     $('.custom').toggleClass('opacity_zero display_none')
    // }
    if ($('#custom_but').hasClass("active") && remain > 0) {
        $('.custom').toggleClass('opacity_zero display_none')
    }

    $('.on_off').toggleClass('cur_on');
    if (!start_time_stamp) { start_time_stamp = parseInt(new Date().getTime()); }
    if (remain <= 0 && submitted) { //Reset timer
        clearInterval(countdown_interval);
        $('.on_off').removeClass("display_none cur_on");
        $('#start_cd').toggleClass("cur_on");
        refresh.classList.add("display_none");
        $('.progress_bar').css('transition', '0.85s')
        submitted = false;
        countdown = false;
        time_paused = 0;
        start_time_stamp = 0;
        remain = default_time;
        set_Progress(bar, (remain / default_time * 100))
        $('#text_timer').text(`${Math.floor(default_time / 60)}:${String(Math.floor(default_time % 60)).padStart(2, '0')}`)
        $('#bar').css('stroke', `rgba(129, 27, 120, ${remain / default_time * 0.35 + 0.1})`) //change progress bar color opacity
        return;
    }
    //countdown functions
    if (!countdown) {
        countdown = true;
        $('.progress_bar').css('transition', '0.35s')
        countdown_interval = setInterval(function () {
            difference = parseInt(new Date().getTime() - start_time_stamp)
            remain = Math.ceil(((default_time * 1000) - time_paused - difference) / 1000); //in seconds
            temp = remain / default_time;
            set_Progress(bar, (temp * 100))
            $('#text_timer').text(`${Math.floor(remain / 60)}:${String(Math.floor((remain % 60))).padStart(2, '0')}`)
            $('#bar').css('stroke', `rgba(129, 27, 120, ${temp * 0.35 + 0.1})`) //change progress bar color opacity
            //call out survey once countdown ends
            if (temp <= -0) {
                call_survery_form();

            }
        }, 100)
    } else if (countdown && remain != 0) { //Pause timer
        pause();
    }


})


//notecard user guide





let submitted = false;

$("#selection_box").submit(function (e) {
    e.preventDefault();
    let id = response.length;
    for (var a = 0; a < 3; a++) {
        let date = new Date();
        let temp_topic = document.getElementById(`thing${a}`).value;
        let temp_desc = $(`#thing${a}desc`).val()
        if (temp_topic == "") { return; }
        let temp = {
            "id": id,
            "time": `${(String(date.getMonth() + 1)).padStart(2, '0')}/${date.getDate()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}${date.getSeconds()}`,
            "topic": temp_topic,
            "desc": temp_desc
        }
        response.push(temp);
        localStorage.setItem(id, JSON.stringify(temp));
        submitted = true;
        id++;

    }
    document.forms[0].reset();

    blur_background();
    $('form').toggleClass('opacity_zero');
    setTimeout(function () {
        $('#selection_box').removeClass('selection_form_animation2')
        $('#selection_box').css('height', `0px`)
        $('#selection_box ').css('height', `0px`)
    }, 100)
    setTimeout(function () {
        $('#selection_box').removeClass('selection_form_animation1')

    }, 350)
});


window.addEventListener('click', function () { //adjust form size
    let form_height = 670;
    $('textarea').each(function () {
        if (this.style.height != "") {
            form_height += parseInt(this.style.height) - 45;
        }
    })
    $('#selection_box').css('height', `${form_height}px`)

})


/*_________________________________________________________________
                    Return to Homescreen       
___________________________________________________________________*/
$('.header').on('click', function (event) {
    //in case user wants to avoid the survey or leave music screen the rude way
    if (remain <= 0 && !submitted || is_music_screen) { return; }
    not_homepage = false;
    //in case the screen was switched before the timer has been paused
    if (countdown) {
        $('.on_off').removeClass("display_none cur_on");
        $('#start_cd').toggleClass("cur_on");
        refresh.classList.add("display_none");
        pause();
    }
    if (is_day_end) {
        is_day_end = false;
        set_auto_rotate()
        $('.sort').toggleClass("opacity_zero")
        $('#reserved div').css({
            'top': '200px',
            'z-index': '0',
            'opacity': '0',
            'transition': '0.5s'
        })
        setTimeout(() => {
            set_auto_rotate()
            $('#reserved div').remove()
        }, 500)
        day_end_screen()
        $('.round_change').removeClass('round_change').addClass('round');

    }
    if (is_clock_display) {
        set_auto_rotate()
        is_clock_display = false;
        not_homepage = false;
        if (is_custom) {
            $('svg').off("mouseenter");
            is_custom = false;
            $('.custom').addClass('opacity_zero display_none')
        }

        //return to homescreen
        $('svg').off('wheel')
        toggle_timer_screen(350)
        $('.progress_bar').css({
            'transition': '0.6s linear',
            'stroke-width': '30px',
            'stroke': 'rgb(219, 209, 218)',
        })
        $('.round_change').removeClass('round_change').addClass('round');
        setTimeout(function () {
            $('.progress_bar').css({
                'transition': '0.6s linear',
                'stroke-width': '1px',
                'stroke': 'rgb(219, 209, 218)',
            })
            $('.round').css('background-color', 'white')
        }, 600)


        //close progress bar animation
        set_Progress(bar, 0);
    }
    $('.dotCircle').css({
        "transform": "rotate(0deg)",
        "transition": "0.5s ease-out",
        "width": "100%",
        "transition": "2s"
    });
    let z = 0
    //button return
    $('.itemDot').each(function () {
        $(this).css({
            'left': inital_position[z][0] + 'px',
            'top': inital_position[z][1] + 'px',
            'transform': 'translate(0px, 0px)'
        })
        z++;
    })


})


// Get the iframe
// const iFrame = document.getElementById('spotify');

// Let's say that you want to access a button with the ID `'myButton'`,
// you can access via the following code:
// const buttonInIFrame = iFrame.contentWindow.document.getElementById('spotify');

// If you need to call a function in the iframe, you can call it as follows:

// for (var de = 0; de < 110; de++) {
//     var tempa = Math.floor(Math.random() * 15 + 1)
//     var temp = {
//         "id": tempa,
//         "time": tempa,
//         "topic": tempa,
//         "desc": tempa
//     }
//     console.log('123')
//     response.push(temp)

// }
var title_time = null;
document.addEventListener("visibilitychange", function () {

    if (document.visibilityState == 'hidden' && countdown) {
        title_time = setInterval(() => {

            var temp = `${Math.floor(remain / 60)}:${String(Math.floor((remain % 60))).padStart(2, '0')}`;
            my_title.innerText = temp;
            change_favicon()
            if (remain <= -0) {
                my_title.innerText = "Time's Up!";
                clearInterval(title_time)
            }
        }, 5000)
        return;
    }
    if (document.visibilityState == 'visible') {
        clearInterval(title_time)
        my_title.innerText = "Tomato Clock";
    }
})
bar.addEventListener('transitionend', function () {
    change_favicon()
})

function change_favicon() {
    if (remain / default_time < 0.3) {
        $("#favicon").attr("href", "./Images/red_tomato.png");
        return;
    }
    else if (remain / default_time < 0.6) {
        $("#favicon").attr("href", "./Images/yellow_tomato.png");
        return;
    }
    else {
        $("#favicon").attr("href", "./Images/green_tomato.png")
    }
}



$('#sound_1').click(function () {
    console.log("123")
})

// https://htmldom.dev/paste-as-plain-text/
window.addEventListener('paste', function (e) {
    // Prevent the default action
    e.preventDefault();

    // Get the copied text from the clipboard
    const text = (e.clipboardData)
        ? (e.originalEvent || e).clipboardData.getData('text/plain')
        // For IE
        : (window.clipboardData ? window.clipboardData.getData('Text') : '');
    console.log("hi" +text)
    if (document.queryCommandSupported('insertText')) {
        document.execCommand('insertText', false, text);
    } else {
        // Insert text at the current position of caret
        const range = document.getSelection().getRangeAt(0);
        range.deleteContents();

        const textNode = document.createTextNode(text);
        range.insertNode(textNode);
        range.selectNodeContents(textNode);
        range.collapse(false);

        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
});

  
