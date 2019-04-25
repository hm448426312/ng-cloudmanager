"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var forms_1 = require("@angular/forms");
var router_1 = require("@angular/router");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var leftmenu_component_1 = require("./leftmenu/leftmenu.component");
var draw_service_1 = require("./draw/draw.service");
var draw_component_1 = require("./draw/draw.component");
var pagination_component_1 = require("./pagination/pagination.component");
var header_component_1 = require("./header/header.component");
var http_service_1 = require("./http/http.service");
var http_1 = require("@angular/http");
var tab_component_1 = require("./tab/tab.component");
var tab_directive_1 = require("./tab/tab.directive");
var auto_component_component_1 = require("./auto-component/auto.component.component");
var pinyin_service_1 = require("./pinyin.service");
var select_component_1 = require("./select/select.component");
var button_component_1 = require("./button/button.component");
var tree_component_1 = require("./tree/tree.component");
var node_component_1 = require("./tree/node.component");
var date_picker_component_1 = require("./date-picker/date.picker.component");
var table_component_1 = require("./table/table.component");
var column_component_1 = require("./table/column.component");
var modal_tip_component_1 = require("./modal-tip/modal.tip.component");
var document_ref_service_1 = require("./document-ref/document-ref.service");
var modal_service_1 = require("./modal/modal.service");
var modal_component_1 = require("./modal/modal.component");
var modal_directive_1 = require("./modal/modal.directive");
var ng2_file_upload_1 = require("ng2-file-upload");
var file_upload_component_1 = require("./file-upload/file.upload.component");
var tip_service_1 = require("./tip/tip.service");
var tip_component_1 = require("./tip/tip.component");
var modal_tip_service_1 = require("./modal-tip/modal.tip.service");
var title_component_1 = require("./title/title.component");
var nbutton_component_1 = require("./nbutton/nbutton.component");
var angular2_qrcode_1 = require("angular2-qrcode");
var qrcode_component_1 = require("./qrcode/qrcode.component");
var show_qrcode_component_1 = require("./qrcode/show.qrcode.component");
var wrap_ellipsis_component_1 = require("./wrap-ellipsis/wrap-ellipsis.component");
var filter_search_pipe_1 = require("./pipe-filter/filter.search.pipe");
var checkbox_component_1 = require("./checkbox/checkbox.component");
var tags_input_component_1 = require("./tags-input/tags.input.component");
var search_component_1 = require("./search/search.component");
var search_select_component_1 = require("./search-select/search.select.component");
var table_new_component_1 = require("./table-new/table.new.component");
var column_new_component_1 = require("./table-new/column.new.component");
var ng_datepicker_component_1 = require("./datepicker/ng-datepicker.component");
var async_component_component_1 = require("./async-component/async.component.component");
var progress_bar_component_1 = require("./progress-bar/progress-bar.component");
var list_show_component_1 = require("./list-show/list.show.component");
var step_component_1 = require("./step/step.component");
var radio_component_1 = require("./radio/radio.component");
var popover_directive_1 = require("./popover/popover.directive");
var input_component_1 = require("./input/input.component");
var ng_datepicker_new_component_1 = require("./datepicker/ng-datepicker-new.component");
var PluginModule = (function () {
    function PluginModule() {
    }
    PluginModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule,
                        forms_1.FormsModule,
                        router_1.RouterModule,
                        http_1.HttpModule,
                        ng2_file_upload_1.FileUploadModule,
                        angular2_qrcode_1.QRCodeModule
                    ],
                    declarations: [
                        async_component_component_1.AsyncComponentComponent,
                        ng_datepicker_component_1.NgDatepickerComponent,
                        ng_datepicker_new_component_1.NgDatepickerNewComponent,
                        column_new_component_1.ColumnNewComponent,
                        table_new_component_1.TableNewComponent,
                        search_select_component_1.SearchSelectComponent,
                        search_component_1.SearchComponent,
                        leftmenu_component_1.LeftMenuComponent,
                        draw_component_1.DrawComponent,
                        pagination_component_1.PaginationComponent,
                        header_component_1.HeaderComponent,
                        tab_component_1.TabComponent,
                        auto_component_component_1.AutoCompleteComponent,
                        tab_component_1.TabComponent,
                        tab_directive_1.TabContentDirective,
                        select_component_1.SelectComponent,
                        button_component_1.ButtonComponent,
                        tree_component_1.TreeComponent,
                        date_picker_component_1.DatePickerComponent,
                        node_component_1.NodeComponent,
                        table_component_1.TableComponent,
                        column_component_1.TableColumnComponent,
                        modal_tip_component_1.ModalTipComponent,
                        modal_component_1.ModalComponent,
                        modal_directive_1.ModalContainerDirective,
                        file_upload_component_1.FileUploadComponent,
                        tip_component_1.TipComponent,
                        title_component_1.TitleComponent,
                        nbutton_component_1.NButtonComponent,
                        qrcode_component_1.QrcodeComponent,
                        show_qrcode_component_1.ShowQrcodeComponent,
                        wrap_ellipsis_component_1.WrapEllipsisComponent,
                        filter_search_pipe_1.FilterSearchPipe,
                        checkbox_component_1.CheckboxComponent,
                        tags_input_component_1.TagsInputComponent,
                        progress_bar_component_1.ProgressBarComponent,
                        list_show_component_1.ListShowComponent,
                        step_component_1.StepComponent,
                        radio_component_1.RadioComponent,
                        popover_directive_1.PopoverDirective,
                        input_component_1.InputComponent,
                    ],
                    exports: [
                        async_component_component_1.AsyncComponentComponent,
                        ng_datepicker_component_1.NgDatepickerComponent,
                        ng_datepicker_new_component_1.NgDatepickerNewComponent,
                        column_new_component_1.ColumnNewComponent,
                        table_new_component_1.TableNewComponent,
                        search_select_component_1.SearchSelectComponent,
                        search_component_1.SearchComponent,
                        leftmenu_component_1.LeftMenuComponent,
                        pagination_component_1.PaginationComponent,
                        header_component_1.HeaderComponent,
                        tab_component_1.TabComponent,
                        auto_component_component_1.AutoCompleteComponent,
                        tab_component_1.TabComponent,
                        select_component_1.SelectComponent,
                        button_component_1.ButtonComponent,
                        tree_component_1.TreeComponent,
                        date_picker_component_1.DatePickerComponent,
                        node_component_1.NodeComponent,
                        table_component_1.TableComponent,
                        column_component_1.TableColumnComponent,
                        modal_tip_component_1.ModalTipComponent,
                        modal_component_1.ModalComponent,
                        file_upload_component_1.FileUploadComponent,
                        tip_component_1.TipComponent,
                        title_component_1.TitleComponent,
                        nbutton_component_1.NButtonComponent,
                        qrcode_component_1.QrcodeComponent,
                        show_qrcode_component_1.ShowQrcodeComponent,
                        draw_component_1.DrawComponent,
                        wrap_ellipsis_component_1.WrapEllipsisComponent,
                        checkbox_component_1.CheckboxComponent,
                        tags_input_component_1.TagsInputComponent,
                        progress_bar_component_1.ProgressBarComponent,
                        list_show_component_1.ListShowComponent,
                        step_component_1.StepComponent,
                        radio_component_1.RadioComponent,
                        popover_directive_1.PopoverDirective,
                        input_component_1.InputComponent,
                    ],
                    providers: [
                        draw_service_1.DrawService,
                        http_service_1.HttpService,
                        pinyin_service_1.PinyinService,
                        modal_service_1.ModalService,
                        modal_tip_service_1.ModalTipService,
                        document_ref_service_1.DocumentRef,
                        tip_service_1.TipService,
                    ],
                    entryComponents: [
                        draw_component_1.DrawComponent,
                        modal_tip_component_1.ModalTipComponent,
                        modal_component_1.ModalComponent,
                        tip_component_1.TipComponent,
                        show_qrcode_component_1.ShowQrcodeComponent
                    ],
                },] },
    ];
    /** @nocollapse */
    PluginModule.ctorParameters = function () { return []; };
    return PluginModule;
}());
exports.PluginModule = PluginModule;
//# sourceMappingURL=plugin.module.js.map