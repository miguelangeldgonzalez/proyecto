import { NgModule } from "@angular/core";

import { UserIcon } from "./user/user.icon";
import { CalendarIcon } from "./calendar/calendar.icon";
import { LocationIcon } from "./location/location.icon";
import { TrashIcon } from "./trash/trash.icon";
import { CheckIcon } from "./check/check.component";
import { WrongIcon } from "./wrong/wrong.component";

const icons = [
  UserIcon,
  TrashIcon,
  CheckIcon,
  WrongIcon,
  CalendarIcon,
  LocationIcon
]

@NgModule({
  declarations: icons,
  exports: icons
})
export class IconModule {}
