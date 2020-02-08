/*
    ioBroker.vis vis-materialdesign Widget-Set

    version: "0.2.51"

    Copyright 2019 Scrounger scrounger@gmx.net
*/
"use strict";

vis.binds.materialdesign.calendar =
    function (el, data) {
        try {
            let $this = $(el);
            let containerClass = 'materialdesign-vuetify-calendar';

            let buttonLayout = '';
            if (data.controlButtonLayout !== 'text') {
                buttonLayout = 'materialdesign-button--' + data.controlButtonLayout;
            }

            let jsonData = [];
            try {
                jsonData = JSON.parse(vis.states.attr(data.oid + '.val'));
            } catch (err) {
                jsonData = [];
                console.error(`[Vuetify Calendar 1] cannot parse json string! Error: ${err.message}`);
            }

            // control button positions
            let controlContainerStyle = '';
            if (data.controlPosition === 'stretch') {
                $this.context.style.setProperty("--vue-calendar-control-button-container-flex", 1);
            } else {
                $this.context.style.setProperty("--vue-calendar-control-button-container-flex", 0);
                $this.context.style.setProperty("--vue-calendar-control-button-container-min-width", myMdwHelper.getStringFromNumberData(data.controlMinWidth, 'initial', '', 'px'));

                if (data.controlPosition === 'center') {
                    controlContainerStyle = ' style="justify-content: center;"'
                } else if (data.controlPosition === 'left') {
                    controlContainerStyle = ' style="justify-content: flex-start;"'
                } else {
                    controlContainerStyle = ' style="justify-content: flex-end;"'
                }
            }

            $this.append(`
            <div class="${containerClass}" style="width: 100%; height: 100%;">
                
                ${(myMdwHelper.getValueFromData(data.controlShow, false) === 'true') ? `
                    <div class="materialdesign-vuetify-calendar-control-container"${controlContainerStyle}>
                        <div class="materialdesign-button materialdesign-vuetify-calendar-control-button ${buttonLayout}" id="control-prev" style="background: ${myMdwHelper.getValueFromData(data.controlButtonColor, '')}">
                            <div class="materialdesign-button-body" style="display:flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                                <span class="materialdesign-vuetify-calendar-control-button-icon mdi mdi-calendar-arrow-left"></span>
                                ${(myMdwHelper.getValueFromData(data.controlShowLabel, false) === 'true') ? `<span class="materialdesign-vuetify-calendar-control-button-text">${_('calendarControlPrev')}</span>` : ''}
                            </div>
                        </div>

                        <div class="materialdesign-button materialdesign-vuetify-calendar-control-button ${buttonLayout}" id="control-today" style="background: ${myMdwHelper.getValueFromData(data.controlButtonColor, '')}">
                            <div class="materialdesign-button-body" style="display:flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                                <span class="materialdesign-vuetify-calendar-control-button-icon mdi mdi-calendar-today"></span>
                                ${(myMdwHelper.getValueFromData(data.controlShowLabel, false) === 'true') ? `<span class="materialdesign-vuetify-calendar-control-button-text">${_('calendarControlToday')}</span>` : ''}
                            </div>
                        </div>

                        <div class="materialdesign-button materialdesign-vuetify-calendar-control-button ${buttonLayout}" id="control-month" style="background: ${myMdwHelper.getValueFromData(data.controlButtonColor, '')}">
                            <div class="materialdesign-button-body" style="display:flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                                <span class="materialdesign-vuetify-calendar-control-button-icon mdi mdi-calendar-month"></span>
                                ${(myMdwHelper.getValueFromData(data.controlShowLabel, false) === 'true') ? `<span class="materialdesign-vuetify-calendar-control-button-text">${_('calendarControlMonth')}</span>` : ''}
                            </div>
                        </div>

                        <div class="materialdesign-button materialdesign-vuetify-calendar-control-button ${buttonLayout}" id="control-week" style="background: ${myMdwHelper.getValueFromData(data.controlButtonColor, '')}">
                            <div class="materialdesign-button-body" style="display:flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                                <span class="materialdesign-vuetify-calendar-control-button-icon mdi mdi-calendar-week"></span>
                                ${(myMdwHelper.getValueFromData(data.controlShowLabel, false) === 'true') ? `<span class="materialdesign-vuetify-calendar-control-button-text">${_('calendarControlWeek')}</span>` : ''}
                            </div>
                        </div>

                        <div class="materialdesign-button materialdesign-vuetify-calendar-control-button ${buttonLayout}" id="control-day" style="background: ${myMdwHelper.getValueFromData(data.controlButtonColor, '')}">
                            <div class="materialdesign-button-body" style="display:flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                                <span class="materialdesign-vuetify-calendar-control-button-icon mdi mdi-calendar"></span>
                                ${(myMdwHelper.getValueFromData(data.controlShowLabel, false) === 'true') ? `<span class="materialdesign-vuetify-calendar-control-button-text">${_('calendarControlDay')}</span>` : ''}
                            </div>
                        </div>                    

                        <div class="materialdesign-button materialdesign-vuetify-calendar-control-button ${buttonLayout}" id="control-next" style="background: ${myMdwHelper.getValueFromData(data.controlButtonColor, '')}">
                            <div class="materialdesign-button-body" style="display:flex; justify-content: center; align-items: center; width: 100%; height: 100%;">
                                <span class="materialdesign-vuetify-calendar-control-button-icon mdi mdi-calendar-arrow-right"></span>
                                ${(myMdwHelper.getValueFromData(data.controlShowLabel, false) === 'true') ? `<span class="materialdesign-vuetify-calendar-control-button-text">${_('calendarControlNext')}</span>` : ''}
                            </div>
                        </div>
                    </div>
                `: ''}

                <v-calendar 
                    v-touch="{
                        left: () => swipe('Left'),
                        right: () => swipe('Right')
                    }"

                    v-model="focus"
                    ref="calendar"

                    :events="events"
                    :event-color="getEventColor"
                    :event-text-color="getEventTextColor"
                    :type="type"
                    :locale="locale"
                    
                    :first-interval="firstInterval"
                    :interval-count="intervalCount"
                    :interval-minutes="intervalMinutes"

                    :short-intervals="shortIntervals"
                    :interval-width="intervalWidth"
                    :interval-height="intervalHeight"
                    :short-weekdays="shortWeekdays"

                    :weekdays="weekdays"
                    :event-height="eventHeight"

                    :event-overlap-mode="eventOverlapMode"

                    @click:more="viewDay"
                    @click:date="viewDay"
                >
              </v-calendar>
            </div>`);

            // Calendar Border
            $this.context.style.setProperty("--vue-calendar-border-color", myMdwHelper.getValueFromData(data.calendarBorderColor, ''));

            // Calendar Background color
            $this.context.style.setProperty("--vue-calendar-background-color", myMdwHelper.getValueFromData(data.calendarDayBackgroundColor, ''));
            $this.context.style.setProperty("--vue-calender-background-outside-color", myMdwHelper.getValueFromData(data.calendarDayBackgroundOutsideColor, ''));

            // Calendar Header Background
            $this.context.style.setProperty("--vue-calender-header-background-color", myMdwHelper.getValueFromData(data.calendarHeaderBackground, ''));

            // Calendar Time Axis Background
            $this.context.style.setProperty("--vue-calendar-time-axis-background-color", myMdwHelper.getValueFromData(data.calendarTimeAxisBackgroundColor, ''));
            $this.context.style.setProperty("--vue-calendar-time-axis-header-background-color", myMdwHelper.getValueFromData(data.calendarTimeAxisHeaderBackgroundColor, ''));

            // Calendar Time Axis Font
            $this.context.style.setProperty("--vue-calendar-time-axis-text-size", myMdwHelper.getStringFromNumberData(data.calendarTimeAxisFontSize, '12px', '', 'px'));
            $this.context.style.setProperty("--vue-calendar-time-axis-text-font", myMdwHelper.getValueFromData(data.calendarTimeAxisFont, 'inherit'));
            $this.context.style.setProperty("--vue-calendar-time-axis-text-color", myMdwHelper.getValueFromData(data.calendarTimeAxisFontColor, ''));

            // Day Button colors
            $this.context.style.setProperty("--vue-btn-background-color-before", myMdwHelper.getValueFromData(data.calendarDayButtonColor, ''));
            $this.context.style.setProperty("--vue-calendar-day-button-today-color", myMdwHelper.getValueFromData(data.calendarDayButtonTodayColor, ''));

            // Day Button ripple color
            $this.context.style.setProperty('--vue-ripple-effect-color', myMdwHelper.getValueFromData(data.calendarDayButtonRippleEffectColor, ''));

            // Day Button Label
            $this.context.style.setProperty("--vue-calendar-day-button-font-size", myMdwHelper.getStringFromNumberData(data.calendarDayButtonFontSize, 'inherit', '', 'px'));
            $this.context.style.setProperty("--vue-calendar-day-button-font-family", myMdwHelper.getValueFromData(data.calendarDayButtonFontFamily, 'inherit'));
            $this.context.style.setProperty("--vue-calendar-day-button-font-color", myMdwHelper.getValueFromData(data.calendarDayButtonFontColor, ''));

            // Day Button Label - Today
            $this.context.style.setProperty("--vue-calendar-day-button-today-font-size", myMdwHelper.getStringFromNumberData(data.calendarDayButtonTodayFontSize, 'inherit', '', 'px'));
            $this.context.style.setProperty("--vue-calendar-day-button-today-font-family", myMdwHelper.getValueFromData(data.calendarDayButtonTodayFontFamily, 'inherit'));
            $this.context.style.setProperty("--vue-calendar-day-button-today-font-color", myMdwHelper.getValueFromData(data.calendarDayButtonTodayFontColor, '#fff'));

            // Day Label
            $this.context.style.setProperty("--vue-calendar-day-label-font-size", myMdwHelper.getStringFromNumberData(data.calendarDayLabelFontSize, '12px', '', 'px'));
            $this.context.style.setProperty("--vue-calendar-day-label-font-family", myMdwHelper.getValueFromData(data.calendarDayLabelFontFamily, 'inherit'));
            $this.context.style.setProperty("--vue-calendar-day-label-font-color", myMdwHelper.getValueFromData(data.calendarDayLabelFontColor, ''));

            $this.context.style.setProperty("--vue-calendar-day-label-previous-font-color", myMdwHelper.getValueFromData(data.calendarDayLabelPreviousFontColor, ''));

            // Day Label - Today
            $this.context.style.setProperty("--vue-calendar-day-label-today-font-size", myMdwHelper.getStringFromNumberData(data.calendarDayLabelTodayFontSize, '12px', '', 'px'));
            $this.context.style.setProperty("--vue-calendar-day-label-today-font-family", myMdwHelper.getValueFromData(data.calendarDayLabelTodayFontFamily, 'inherit'));
            $this.context.style.setProperty("--vue-calendar-day-label-today-font-color", myMdwHelper.getValueFromData(data.calendarDayLabelTodayFontColor, ''));

            // Control button icon
            $this.context.style.setProperty("--vue-calendar-control-button-icon-size", myMdwHelper.getStringFromNumberData(data.controlIconSize, '24px', '', 'px'));
            $this.context.style.setProperty("--vue-calendar-control-button-icon-color", myMdwHelper.getValueFromData(data.controlIconColor, ''));

            // Control button text
            $this.context.style.setProperty("--vue-calendar-control-button-text-size", myMdwHelper.getStringFromNumberData(data.controlTextSize, '12px', '', 'px'));
            $this.context.style.setProperty("--vue-calendar-control-button-text-font", myMdwHelper.getValueFromData(data.controlTextFont, 'inherit'));
            $this.context.style.setProperty("--vue-calendar-control-button-text-color", myMdwHelper.getValueFromData(data.controlTextColor, ''));

            // Control Button ripple color
            $this.context.style.setProperty('--mdc-theme-primary', myMdwHelper.getValueFromData(data.controlButtonRippelEffectColor, ''));
            $this.context.style.setProperty('--mdc-theme-on-primary', myMdwHelper.getValueFromData(data.controlButtonRippelEffectColor, ''));

            // Event style
            $this.context.style.setProperty("--vue-aclendar-event-font-size", myMdwHelper.getStringFromNumberData(data.calendarEventFontSize, '12px', '', 'px'));
            $this.context.style.setProperty("--vue-aclendar-event-font", myMdwHelper.getValueFromData(data.calendarEventFont, 'inherit'));


            myMdwHelper.waitForElement($this, `.${containerClass}`, function () {
                myMdwHelper.waitForElement($("body"), '#materialdesign-vuetify-container', function () {
                    // wait for Vuetify v-app application container is loaded
                    let firstInterval = myMdwHelper.getNumberFromData(data.calendarTimeAxisStartTime, 0);
                    let intervalCount = myMdwHelper.getNumberFromData(data.calendarTimeAxisEndTime, 24);
                    let intervalMinutes = myMdwHelper.getNumberFromData(data.calendarTimeAxisIntervalMinutes, 60);

                    let vueCalendar = new Vue({
                        el: $this.find(`.${containerClass}`).get(0),
                        vuetify: new Vuetify(),
                        data: () => ({
                            focus: moment().format('YYYY-MM-DD'),
                            type: data.calendarView,
                            btnTodayColor: myMdwHelper.getValueFromData(data.calendarDayButtonTodayColor, '#44739e'),
                            shortWeekdays: (myMdwHelper.getValueFromData(data.calendarShortWeekdays, false) === 'true') ? true : false,
                            intervalWidth: myMdwHelper.getNumberFromData(data.calendarTimeAxisWidth, 60),
                            intervalHeight: myMdwHelper.getNumberFromData(data.calendarTimeAxisHeight, 48),
                            shortIntervals: (myMdwHelper.getValueFromData(data.calendarTimeAxisShortIntervals, false) === 'true') ? true : false,
                            locale: vis.language,
                            weekdays: myMdwHelper.getValueFromData(data.calendarWeekdays, "1,2,3,4,5,6,0").split(",").map(Number),
                            firstInterval: firstInterval * 60 / intervalMinutes,
                            intervalCount: intervalCount * 60 / intervalMinutes - firstInterval * 60 / intervalMinutes,
                            intervalMinutes: intervalMinutes,
                            events: jsonData,
                            eventHeight: myMdwHelper.getNumberFromData(data.calendarEventHeight, 20),
                            eventOverlapMode: data.calendarEventOverlapMode,
                        }),
                        methods: {
                            getEventColor(event) {
                                return event.color
                            },
                            getEventTextColor(event) {
                                return event.colorText
                            },
                            viewDay({ date }) {
                                vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);

                                this.focus = date

                                if (this.type === 'month') {
                                    this.type = data.calendarDayButtonMonthViewGoTo;
                                } else if (this.type === 'week') {
                                    this.type = data.calendarDayButtonWeekViewGoTo;
                                } else if (this.type === 'day') {
                                    this.type = data.calendarDayButtonDayViewGoTo;
                                }
                            },
                            swipe(direction) {
                                this.swipeDirection = direction

                                if (direction === 'Left') {
                                    this.$refs.calendar.prev()
                                } else if (direction === 'Right') {
                                    this.$refs.calendar.next()
                                }
                            }
                        },
                        mounted() {
                            this.$refs.calendar.scrollToTime(moment(this.now).format('HH:mm'));
                        }
                    })

                    let controlButtons = $this.find('.materialdesign-vuetify-calendar-control-button');
                    for (var i = 0; i <= controlButtons.length - 1; i++) {
                        mdc.ripple.MDCRipple.attachTo(controlButtons.get(i));
                    }

                    $this.find('#control-prev').click(function () {
                        vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);
                        vueCalendar.$refs.calendar.prev();
                    });

                    $this.find('#control-today').click(function () {
                        vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);
                        vueCalendar.focus = vueCalendar.now;
                    });

                    $this.find('#control-month').click(function () {
                        vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);
                        vueCalendar.type = 'month';
                    });

                    $this.find('#control-week').click(function () {
                        vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);
                        vueCalendar.type = 'week';
                    });

                    $this.find('#control-day').click(function () {
                        vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);
                        vueCalendar.type = 'day';
                    });

                    $this.find('#control-next').click(function () {
                        vis.binds.materialdesign.helper.vibrate(data.vibrateOnMobilDevices);
                        vueCalendar.$refs.calendar.next();
                    });


                    vis.states.bind(data.oid + '.val', function (e, newVal, oldVal) {
                        try {
                            jsonData = JSON.parse(vis.states.attr(data.oid + '.val'));
                        } catch (err) {
                            jsonData === [];
                            console.error(`[Vuetify Calendar 2] cannot parse json string! Error: ${err.message}`);
                        }

                        vueCalendar.events = jsonData;
                    });
                });
            });

        } catch (ex) {
            console.error(`[Vuetify Calendar]: error: ${ex.message}, stack: ${ex.stack}`);
        }
    }