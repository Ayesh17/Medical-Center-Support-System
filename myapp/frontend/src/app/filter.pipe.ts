import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'filter',
    pure: false
})

export class FilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any {
        return items.filter(item => {
            //console.log("FILTER ARGS", args);
            //console.log("ITEM", item.name);
            if(item.name.includes(args) ){
                return item.name;
            }
            
            //item.name.indexOf(args[0]) !== -1;
        });
    }
}