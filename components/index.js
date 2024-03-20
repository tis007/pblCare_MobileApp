//Screen header
import ScreenHeaderBtn from "./common/header/ScreenHeaderBtn";
import ScreenHeaderLogo from "./common/header/ScreenHeaderLogo";
import MainMenu from "./common/header/MainMenu";

// home screen
import Welcome from "./home/welcome/Welcome";
import DatePicker from "./home/DatePicker";
import ActiveSessions from "./home/sessions/activeSessions/ActiveSessions";
import CompletedSessions from "./home/sessions/completedSessions/CompletedSessions";

// job details screen
import { default as JobTabs } from "./common/tabs/Tabs";

//Sessions
import PatientPanel from "./session/patientPanel/PatientPanel";
import VisitDetails from "./session/visitDetails/VisitDetails";
import PatientDetails from "./session/patientDetails/PatientDetails";
import StartSession from "./session/startSession/StartSession";
import Tasks from "./session/tasks/Tasks";
import History from "./session/history/History";
import MedicalConditions from "./session/medicalConditions/MedicalConditions";
import CompleteTasks from "./session/completeTasks/CompleteTasks";
import VisitNotes from "./session/visitNotes/VisitNotes";
import CompleteVisitNotes from "./session/completeVisitNotes/CompleteVisitNotes";
import CompleteVisitNotesContent from "./session/completeVisitNotesContent/CompleteVisitNotesContent";
import EndSession from "./session/endSession/EndSession";
import CompleteTaskContent from "./session/completeTaskContent/CompleteTaskContent";

//Account
import AccountPanel from "./account/accountPanel/AccountPanel";
import ChangeProfilePicturePanel from "./account/changeAccount/ChangeProfilePicturePanel";

//Common
import ActiveSessionCard from "./common/cards/activeSessions/ActiveSessionCard";
import CompletedSessionCard from "./common/cards/completedSessions/CompletedSessionCard";
import TaskCard from "./common/cards/tasks/TasksCard";
import HistoryCard from "./common/cards/history/HistoryCard";
import MedicalConditionsCard from "./common/cards/medicalConditions/MedicalConditionsCard";

//Device
import DeviceBannedContent from "./device/deviceBannedContent";
import DeviceInactiveContent from "./device/deviceInactiveContent";

//Authentication
import SignInContent from "./authentication/SignInContent";

export {
  ScreenHeaderBtn,
  ScreenHeaderLogo,
  MainMenu,
  DatePicker,
  Welcome,
  JobTabs,
  ActiveSessions,
  CompletedSessions,
  ActiveSessionCard,
  CompletedSessionCard,
  TaskCard,
  HistoryCard,
  MedicalConditionsCard,
  DeviceBannedContent,
  DeviceInactiveContent,
  SignInContent,
  PatientPanel,
  VisitDetails,
  PatientDetails,
  StartSession,
  AccountPanel,
  Tasks,
  History,
  MedicalConditions,
  CompleteTasks,
  VisitNotes,
  CompleteVisitNotes,
  CompleteVisitNotesContent,
  EndSession,
  CompleteTaskContent,
  ChangeProfilePicturePanel,
};
