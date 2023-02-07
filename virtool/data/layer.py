from dataclasses import dataclass
from typing import TYPE_CHECKING

from virtool.account.data import AccountData

if TYPE_CHECKING:
    from virtool.analyses.data import AnalysisData
from virtool.auth.data import AuthData
from virtool.blast.data import BLASTData
from virtool.groups.data import GroupsData
from virtool.history.data import HistoryData
from virtool.hmm.data import HmmData
from virtool.indexes.data import IndexData
from virtool.jobs.data import JobsData
from virtool.labels.data import LabelsData
from virtool.messages.data import MessagesData
from virtool.otus.data import OTUData
from virtool.references.data import ReferencesData
from virtool.samples.data import SamplesData
from virtool.settings.data import SettingsData
from virtool.subtractions.data import SubtractionsData
from virtool.tasks.data import TasksData
from virtool.uploads.data import UploadsData
from virtool.users.data import UsersData
from virtool.users.sessions import SessionData


@dataclass
class DataLayer:

    """
    Provides access to Virtool application data through an abstract interface over
    database and storage.

    """

    account: AccountData
    analyses: "AnalysisData"
    auth: AuthData
    blast: BLASTData
    groups: GroupsData
    history: HistoryData
    hmms: HmmData
    index: IndexData
    jobs: JobsData
    labels: LabelsData
    messages: MessagesData
    otus: OTUData
    references: ReferencesData
    samples: SamplesData
    subtractions: SubtractionsData
    sessions: SessionData
    settings: SettingsData
    tasks: TasksData
    uploads: UploadsData
    users: UsersData

    def __post_init__(self):
        self.hmms.bind_layer(self)
        self.samples.bind_layer(self)
        self.subtractions.bind_layer(self)
        self.blast.bind_layer(self)
        self.analyses.bind_layer(self)
        self.references.bind_layer(self)
        self.sessions.bind_layer(self)
        self.account.bind_layer(self)
