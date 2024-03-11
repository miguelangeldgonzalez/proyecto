import { NgModule } from "@angular/core";

import { UserIcon } from "./user/user.icon";
import { CalendarIcon } from "./calendar/calendar.icon";
import { LocationIcon } from "./location/location.icon";
import { TrashIcon } from "./trash/trash.icon";

const icons = [
  UserIcon,
  TrashIcon,
  CalendarIcon,
  LocationIcon
]

@NgModule({
  declarations: icons,
  exports: icons
})
export class IconModule {}
