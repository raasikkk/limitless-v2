import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { scheduleData as initialScheduleData } from "@/constants/schedule"
import { Pencil } from "lucide-react"
import { useState } from "react"
import { utils, writeFile } from "xlsx"

interface ScheduleItem {
  id: string;
  group: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
}

const Schedule = () => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>(initialScheduleData);
  const isCurator = true;

  const exportToExcel = () => {
    const worksheetData = [
      ['Group', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      ...scheduleData.map(item => [
        item.group,
        item.monday,
        item.tuesday,
        item.wednesday,
        item.thursday,
        item.friday
      ])
    ];

    const worksheet = utils.aoa_to_sheet(worksheetData);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, 'Schedule');
    writeFile(workbook, 'Schedule.xlsx', { compression: true });
  }

  const handleInputChange = (id: string, field: keyof ScheduleItem, value: string) => {
    setScheduleData(prevData =>
      prevData.map(item =>
        item.id === id ? { ...item, [field]: value } : item
      )
    );
  };

  const handleEditToggle = (id: string) => {
    setEditingId(currentId => currentId === id ? null : id);
  };

  return (
    <div className="mt-5 text-black dark:text-white">
      <h2 className="text-3xl font-bold">Schedule</h2>
      <div className="flex justify-end items-center gap-2">
        <button 
          className="p-2 px-4 border rounded-full"
          onClick={exportToExcel}
        >
          Export as Excel
        </button>
      </div>
      <Table className="mt-5">
        <TableCaption>Schedule of your group</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">Group</TableHead>
            <TableHead>Monday</TableHead>
            <TableHead>Tuesday</TableHead>
            <TableHead>Wednesday</TableHead>
            <TableHead>Thursday</TableHead>
            <TableHead className="text-right">Friday</TableHead>
            {isCurator && <TableHead className="text-right">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {scheduleData.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.group}
                    onChange={(e) => handleInputChange(item.id, 'group', e.target.value)}
                    className="w-full rounded-md bg-white dark:bg-darkSecondary p-1 border border-primaryColor"
                  />
                ) : (
                  item.group
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.monday}
                    onChange={(e) => handleInputChange(item.id, 'monday', e.target.value)}
                    className="w-full rounded-md bg-white dark:bg-darkSecondary p-1 border border-primaryColor"
                  />
                ) : (
                  item.monday
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.tuesday}
                    onChange={(e) => handleInputChange(item.id, 'tuesday', e.target.value)}
                    className="w-full rounded-md bg-white dark:bg-darkSecondary p-1 border border-primaryColor"
                  />
                ) : (
                  item.tuesday
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.wednesday}
                    onChange={(e) => handleInputChange(item.id, 'wednesday', e.target.value)}
                    className="w-full rounded-md bg-white dark:bg-darkSecondary p-1 border border-primaryColor"
                  />
                ) : (
                  item.wednesday
                )}
              </TableCell>
              <TableCell>
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.thursday}
                    onChange={(e) => handleInputChange(item.id, 'thursday', e.target.value)}
                    className="w-full rounded-md bg-white dark:bg-darkSecondary p-1 border border-primaryColor"
                  />
                ) : (
                  item.thursday
                )}
              </TableCell>
              <TableCell className="text-right">
                {editingId === item.id ? (
                  <input
                    type="text"
                    value={item.friday}
                    onChange={(e) => handleInputChange(item.id, 'friday', e.target.value)}
                    className="w-full rounded-md bg-white dark:bg-darkSecondary p-1 border border-primaryColor"
                  />
                ) : (
                  item.friday
                )}
              </TableCell>
              {isCurator && (
                <TableCell className="text-right">
                  <button
                    onClick={() => handleEditToggle(item.id)}
                    className="p-2 w-full text-end flex items-end gap-2"
                  >
                    {editingId === item.id ? (
                      <>Cancel</>
                    ) : (
                      <><Pencil size={15} /> Edit</>
                    )}
                  </button>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default Schedule