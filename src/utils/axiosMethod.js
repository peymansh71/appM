import http from '../services/httpsService'
import config from "../config.json"

//****************************************************************
//************************* From-Creator *******************************
export function CreateForm(data) {
    return http.post(config.api_CreateModal, data)
}

//****************************************************************
//************************* Equipment *******************************
export function GetEquipment(data) {
    return http.post(config.api_GetEquipment, data)
}
export function CreateEquipment(data) {
    return http.post(config.api_CreateEquipment, data)
}
export function UpdateEquipment(data) {
    return http.post(config.api_UpdateEquipment, data)
}
export function DeleteEquipment(data) {
    return http.post(config.api_DeleteEquipment, data)
}

//****************************************************************
//************************* Pit *******************************
export function GetPit(data) {
    return http.post(config.api_GetPit, data)
}
export function CreatePit(data) {
    return http.post(config.api_CreatePit, data)
}
export function UpdatePit(data) {
    return http.post(config.api_UpdatePit, data)
}
export function DeletePit(data) {
    return http.post(config.api_DeletePit, data)
}


//****************************************************************
//************************* Equip Type *********************************
export function GetEquipType(data) {
    return http.post(config.api_GetEquipType, data)
}
export function CreateEquipType(data) {
    return http.post(config.api_CreateEquipType, data)
}
export function UpdateEquipType(data) {
    return http.post(config.api_UpdateEquipType, data)
}
export function DeleteEquipType(data) {
    return http.post(config.api_DeleteEquipType, data)
}

//****************************************************************
//************************* Zone *********************************
export function GetZone(data) {
    return http.post(config.api_GetZone, data)
}
export function CreateZone(data) {
    return http.post(config.api_CreateZone, data)
}
export function UpdateZone(data) {
    return http.post(config.api_UpdateZone, data)
}
export function DeleteZone(data) {
    return http.post(config.api_DeleteZone, data)
}

//****************************************************************
//********************** Bench ***********************************
export function GetBench(data) {
    return http.post(config.api_GetBench, data)
}
export function CreateBench(data) {
    return http.post(config.api_CreateBench, data)
}
export function UpdateBench(data) {
    return http.post(config.api_UpdateBench, data)
}
export function DeleteBench(data) {
    return http.post(config.api_DeleteBench, data)
}

//****************************************************************
//********************** IHM ***********************************
export function GetIhm(data) {
    return http.post(config.api_GetIhm, data)
}
export function CreateIhm(data) {
    return http.post(config.api_CreateIhm, data)
}
export function UpdateIhm(data) {
    return http.post(config.api_UpdateIhm, data)
}
export function DeleteIhm(data) {
    return http.post(config.api_DeleteIhm, data)
}

//****************************************************************
//********************** Tab ***********************************
export function GetTab(data) {
    return http.post(config.api_GetTab, data)
}
export function CreateTab(data) {
    return http.post(config.api_CreateTab, data)
}
export function UpdateTab(data) {
    return http.post(config.api_UpdateTab, data)
}
export function DeleteTab(data) {
    return http.post(config.api_DeleteTab, data)
}
//****************************************************************
//********************** WorkshopType ***********************************
export function GetWorkshopType(data) {
    return http.post(config.api_GetWorkshopType, data)
}
export function CreateWorkshopType(data) {
    return http.post(config.api_CreateWorkshopType, data)
}
export function UpdateWorkshopType(data) {
    return http.post(config.api_UpdateWorkshopType, data)
}
export function DeleteWorkshopType(data) {
    return http.post(config.api_DeleteWorkshopType, data)
}

//****************************************************************
//********************** WorkshopType ***********************************
export function GetMine(data) {
    return http.post(config.api_GetMine, data)
}
export function CreateMine(data) {
    return http.post(config.api_CreateMine, data)
}
export function UpdateMine(data) {
    return http.post(config.api_UpdateMine, data)
}
export function DeleteMine(data) {
    return http.post(config.api_DeleteMine, data)
}

//****************************************************************
//********************** Team Type ***********************************
export function GetTeamType(data) {
    return http.post(config.api_GetTeamType, data)
}
export function CreateTeamType(data) {
    return http.post(config.api_CreateTeamType, data)
}
export function UpdateTeamType(data) {
    return http.post(config.api_UpdateTeamType, data)
}
export function DeleteTeamType(data) {
    return http.post(config.api_DeleteTeamType, data)
}

//****************************************************************
//********************** Team  ***********************************
export function GetTeam(data) {
    return http.post(config.api_GetTeam, data)
}
export function CreateTeam(data) {
    return http.post(config.api_CreateTeam, data)
}
export function UpdateTeam(data) {
    return http.post(config.api_UpdateTeam, data)
}
export function DeleteTeam(data) {
    return http.post(config.api_DeleteTeam, data)
}

//****************************************************************
//********************** Change Serial  ***********************************
export function GetChangeSerial(data) {
    return http.post(config.api_GetChangeSerial, data)
}
export function CreateChangeSerial(data) {
    return http.post(config.api_CreateChangeSerial, data)
}
export function UpdateChangeSerial(data) {
    return http.post(config.api_UpdateChangeSerial, data)
}
export function DeleteChangeSerial(data) {
    return http.post(config.api_DeleteChangeSerial, data)
}
//****************************************************************
//********************** State Group  ***********************************
export function GetStateGroup(data) {
    return http.post(config.api_GetStateGroup, data)
}
export function CreateStateGroup(data) {
    return http.post(config.api_CreateStateGroup, data)
}
export function UpdateStateGroup(data) {
    return http.post(config.api_UpdateStateGroup, data)
}
export function DeleteStateGroup(data) {
    return http.post(config.api_DeleteStateGroup, data)
}
//****************************************************************
//********************** State  ***********************************
export function GetState(data) {
    return http.post(config.api_GetState, data)
}
export function CreateState(data) {
    return http.post(config.api_CreateState, data)
}
export function UpdateState(data) {
    return http.post(config.api_UpdateState, data)
}
export function DeleteState(data) {
    return http.post(config.api_DeleteState, data)
}
//****************************************************************
//********************** Model  ***********************************
export function GetModel(data) {
    return http.post(config.api_GetModel, data)
}
export function CreateModel(data) {
    return http.post(config.api_CreateModel, data)
}
export function UpdateModel(data) {
    return http.post(config.api_UpdateModel, data)
}
export function DeleteModel(data) {
    return http.post(config.api_DeleteModel, data)
}
//****************************************************************
//********************** Number Of ShovelFuls  ***********************************
export function GetNumberOfShovelfuls(data) {
    return http.post(config.api_GetNumberOfShovelfuls, data)
}
export function CreateNumberOfShovelfuls(data) {
    return http.post(config.api_CreateNumberOfShovelfuls, data)
}
export function UpdateNumberOfShovelfuls(data) {
    return http.post(config.api_UpdateNumberOfShovelfuls, data)
}
export function DeleteNumberOfShovelfuls(data) {
    return http.post(config.api_DeleteNumberOfShovelfuls, data)
}
//****************************************************************
//********************** Job  ***********************************
export function GetJob(data) {
    return http.post(config.api_GetJob, data)
}
export function CreateJob(data) {
    return http.post(config.api_CreateJob, data)
}
export function UpdateJob(data) {
    return http.post(config.api_UpdateJob, data)
}
export function DeleteJob(data) {
    return http.post(config.api_DeleteJob, data)
}
//****************************************************************
//********************** workshop  ***********************************
export function GetWorkshop(data) {
    return http.post(config.api_GetWorkshop, data)
}
export function CreateWorkshop(data) {
    return http.post(config.api_CreateWorkshop, data)
}
export function UpdateWorkshop(data) {
    return http.post(config.api_UpdateWorkshop, data)
}
export function DeleteWorkshop(data) {
    return http.post(config.api_DeleteWorkshop, data)
}
//****************************************************************
//********************** Personel  ***********************************
export function GetPersonel(data) {
    return http.post(config.api_GetPersonel, data)
}
export function CreatePersonel(data) {
    return http.post(config.api_CreatePersonel, data)
}
export function UpdatePersonel(data) {
    return http.post(config.api_UpdatePersonel, data)
}
export function DeletePersonel(data) {
    return http.post(config.api_DeletePersonel, data)
}

//****************************************************************
//********************** Lithologhy  ***********************************
export function GetLithology(data) {
    return http.post(config.api_GetLithology, data)
}
export function CreateLithology(data) {
    return http.post(config.api_CreateLithology, data)
}
export function UpdateLithology(data) {
    return http.post(config.api_UpdateLithology, data)
}
export function DeleteLithology(data) {
    return http.post(config.api_DeleteLithology, data)
}
//********************************************************************** 
//********************** LithologhyType  ***********************************
export function GetLithologyType(data) {
    return http.post(config.api_GetLithologyType, data)
}
export function CreateLithologyType(data) {
    return http.post(config.api_CreateLithologyType, data)
}
export function UpdateLithologyType(data) {
    return http.post(config.api_UpdateLithologyType, data)
}
export function DeleteLithologyType(data) {
    return http.post(config.api_DeleteLithologyType, data)
}
//**********************************************************************
//********************** EntityType  ***********************************
export function GetEntityType(data) {
    return http.post(config.api_GetEntityType, data)
}
export function CreateEntityType(data) {
    return http.post(config.api_CreateEntityType, data)
}
export function UpdateEntityType(data) {
    return http.post(config.api_UpdateEntityType, data)
}
export function DeleteEntityType(data) {
    return http.post(config.api_DeleteEntityType, data)
}
//**********************************************************************
//********************** Patern  ***********************************
export function GetPatern(data) {
    return http.post(config.api_GetPatern, data)
}
export function CreatePatern(data) {
    return http.post(config.api_CreatePatern, data)
}
export function UpdatePatern(data) {
    return http.post(config.api_UpdatePatern, data)
}
export function DeletePatern(data) {
    return http.post(config.api_DeletePatern, data)
}
//**********************************************************************
//********************** Messages  ***********************************
export function GetMessages(data) {
    return http.post(config.api_GetMessages, data)
}
export function CreateMessages(data) {
    return http.post(config.api_CreateMessages, data)
}
export function UpdateMessages(data) {
    return http.post(config.api_UpdateMessages, data)
}
export function DeleteMessages(data) {
    return http.post(config.api_DeleteMessages, data)
}
//**********************************************************************
//********************** Image-Group  ***********************************
export function GetImageGroup(data) {
    return http.post(config.api_GetImageGroup, data)
}
export function CreateImageGroup(data) {
    return http.post(config.api_CreateImageGroup, data)
}
export function UpdateImageGroup(data) {
    return http.post(config.api_UpdateImageGroup, data)
}
export function DeleteImageGroup(data) {
    return http.post(config.api_DeleteImageGroup, data)
}
//**********************************************************************
//********************** Image-set  ***********************************
export function GetImageSets(data) {
    return http.post(config.api_GetImageSets, data)
}
export function CreateImageSets(data) {
    return http.post(config.api_CreateImageSets, data)
}
export function UpdateImageSets(data) {
    return http.post(config.api_UpdateImageSets, data)
}
export function DeleteImageSets(data) {
    return http.post(config.api_DeleteImageSets, data)
}
//**********************************************************************
//********************** Image  ***********************************
export function GetImage(data) {
    return http.post(config.api_GetImage, data)
}
export function CreateImage(data) {
    return http.post(config.api_CreateImage, data)
}
export function UpdateImage(data) {
    return http.post(config.api_UpdateImage, data)
}
export function DeleteImage(data) {
    return http.post(config.api_DeleteImage, data)
}
//**********************************************************************
//********************** PersonelWorkshop  ***********************************
export function GetPersonelWorkshop(data) {
    return http.post(config.api_GetPersonelWorkshop, data)
}
export function CreatePersonelWorkshop(data) {
    return http.post(config.api_CreatePersonelWorkshop, data)
}
export function UpdatePersonelWorkshop(data) {
    return http.post(config.api_UpdatePersonelWorkshop, data)
}
export function DeletePersonelWorkshop(data) {
    return http.post(config.api_DeletePersonelWorkshop, data)
}

//**********************************************************************
//********************** SubArea  ***********************************
export function GetSubArea(data) {
    return http.post(config.api_GetSubArea, data)
}
export function CreateSubArea(data) {
    return http.post(config.api_CreateSubArea, data)
}
export function UpdateSubArea(data) {
    return http.post(config.api_UpdateSubArea, data)
}
export function DeleteSubArea(data) {
    return http.post(config.api_DeleteSubArea, data)
}


//**********************************************************************
//********************** Mine Entity Type  ***********************************
export function GetMineEntityType(data) {
    return http.post(config.api_GetMineEntityType, data)
}
export function CreateMineEntityType(data) {
    return http.post(config.api_CreateMineEntityType, data)
}
export function UpdateMineEntityType(data) {
    return http.post(config.api_UpdateMineEntityType, data)
}
export function DeleteMineEntityType(data) {
    return http.post(config.api_DeleteMineEntityType, data)
}



//**********************************************************************
//********************** Mine Entity   ***********************************
export function GetMineEntity(data) {
    return http.post(config.api_GetMineEntity, data)
}
export function CreateMineEntity(data) {
    return http.post(config.api_CreateMineEntity, data)
}
export function UpdateMineEntity(data) {
    return http.post(config.api_UpdateMineEntity, data)
}
export function DeleteMineEntity(data) {
    return http.post(config.api_DeleteMineEntity, data)
}

//**********************************************************************
//********************** Allocationworkshop   ***********************************
export function GetAllocationworkshop(data) {
    return http.post(config.api_GetAllocationworkshop, data)
}
export function CreateAllocationworkshop(data) {
    return http.post(config.api_CreateAllocationworkshop, data)
}
export function UpdateAllocationworkshop(data) {
    return http.post(config.api_UpdateAllocationworkshop, data)
}
export function DeleteAllocationworkshop(data) {
    return http.post(config.api_DeleteAllocationworkshop, data)
}

//**********************************************************************
//********************** SubAreaType   ***********************************
export function GetSubAreaType(data) {
    return http.post(config.api_GetSubAreaType, data)
}
export function CreateSubAreaType(data) {
    return http.post(config.api_CreateSubAreaType, data)
}
export function UpdateSubAreaType(data) {
    return http.post(config.api_UpdateSubAreaType, data)
}
export function DeleteSubAreaType(data) {
    return http.post(config.api_DeleteSubAreaType, data)
}
//**********************************************************************
//********************** CalendarSetting   ***********************************
export function GetCalendarSetting(data) {
    return http.post(config.api_GetCalendarSetting, data)
}
export function CreateCalendarSetting(data) {
    return http.post(config.api_CreateCalendarSetting, data)
}
export function UpdateCalendarSetting(data) {
    return http.post(config.api_UpdateCalendarSetting, data)
}
export function DeleteCalendarSetting(data) {
    return http.post(config.api_DeleteCalendarSetting, data)
}
//**********************************************************************
//********************** Calendar   ***********************************
export function GetCalendar(data) {
    return http.post(config.api_GetCalendar, data)
}
export function CreateCalendar(data) {
    return http.post(config.api_CreateCalendar, data)
}
export function UpdateCalendar(data) {
    return http.post(config.api_UpdateCalendar, data)
}
export function DeleteCalendar(data) {
    return http.post(config.api_DeleteCalendar, data)
}
//**********************************************************************
//********************** Shift   ***********************************
export function GetShift(data) {
    return http.post(config.api_GetShift, data)
}
export function CreateShift(data) {
    return http.post(config.api_CreateShift, data)
}
export function UpdateShift(data) {
    return http.post(config.api_UpdateShift, data)
}
export function DeleteShift(data) {
    return http.post(config.api_DeleteShift, data)
}

//**********************************************************************
//********************** Group   ***********************************
export function GetGroup(data) {
    return http.post(config.api_GetGroup, data)
}
export function CreateGroup(data) {
    return http.post(config.api_CreateGroup, data)
}
export function UpdateGroup(data) {
    return http.post(config.api_UpdateGroup, data)
}
export function DeleteGroup(data) {
    return http.post(config.api_DeleteGroup, data)
}
//**********************************************************************
//********************** Users   ***********************************
export function GetUsers(data) {
    return http.post(config.api_GetUsers, data)
}
export function CreateUsers(data) {
    return http.post(config.api_CreateUsers, data)
}
export function UpdateUsers(data) {
    return http.post(config.api_UpdateUsers, data)
}
export function DeleteUsers(data) {
    return http.post(config.api_DeleteUsers, data)
}