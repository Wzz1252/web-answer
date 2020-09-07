import FilterData from "@/filters/FilterData";
import FilterPrice from "@/filters/FilterPrice";
import FilterString from "@/filters/FilterString";

export default {
    install(vue: any, options: any) {
        FilterData.install(vue, options);
        FilterPrice.install(vue, options);
        FilterString.install(vue, options);
    }
}
