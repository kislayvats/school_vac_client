"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Selection,
  ChipProps,
  SortDescriptor,
} from "@heroui/react";

import { ChevronDownIcon, SearchIcon } from "@/icons";
import { API_PREFIX, capitalize, IconList } from "@/config";
import { useDispatch, useSelector } from "react-redux";

import { IconOnlyButton } from "@/components/buttons";

import { QUERY_KEY_LIST } from "@/config";

import { currentModal } from "@/store/modalSlice";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { schoolAdminStore } from "@/store/schoolAdminSlice";
import { getAllStudentsAPI } from "@/functions";
import moment from "moment";
import { ModalIdList } from "@/components/modal/ModalIdList";

const INITIAL_VISIBLE_COLUMNS = [
  "sl_no",
  "name",
  "student_id",
  "email",
  "mobile_number",
  "actions",
];

const LeadTableColumnsData = [
  { name: "Sl.No", uid: "sl_no", sortable: true },
  { name: "Full Name", uid: "name", sortable: true },
  { name: "Student ID", uid: "student_id", sortable: true },
  { name: "Email", uid: "email", sortable: true },
  { name: "Mobile Number", uid: "mobile_number", sortable: true },
  { name: "Date & Time", uid: "createdAt", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];

export default function StudentsTable() {
  const adminUser = useSelector(schoolAdminStore);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([])
  );
  const [selectedList, setSelectedList] = React.useState<string[]>([]); // this array contains the ID's of the block selected for the action to be taken and will be sent to backend by making API call
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState<Selection>("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  // ?Fetch the data from the backend using useQuery hook
  const {
    data: studentsData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEY_LIST.STUDENTS, page, rowsPerPage, filterValue],
    queryFn: () =>
      getAllStudentsAPI(page, rowsPerPage, filterValue, adminUser?.token),
  });

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return LeadTableColumnsData;

    return LeadTableColumnsData?.filter((column) =>
      Array.from(visibleColumns).includes(column?.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredProduct = [...(studentsData?.students || [])];

    return filteredProduct;
  }, [studentsData, filterValue, statusFilter]);

  const sortedItems = React.useMemo(() => {
    return [...filteredItems].sort((a: any, b: any) => {
      const first = a[sortDescriptor.column as keyof any] as number;
      const second = b[sortDescriptor.column as keyof any] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const renderCell = React.useCallback((student: any, columnKey: React.Key) => {
    const cellValue = student[columnKey as keyof any];

    switch (columnKey) {
      case "sl_no":
        return String(cellValue);
      case "name":
        return String(cellValue);
      case "email":
        return String(cellValue);
      case "mobile_number":
        return String(cellValue);
      case "status":
        return String(cellValue);
      case "createdAt":
        return moment(cellValue).format("DD/MM/YYYY hh:mm A");
      case "actions":
        return (
          <div className="relative flex justify-start items-center gap-1">
            <IconOnlyButton
              Icon={IconList.PencilSquareIcon}
              iconClass="h-4 w-4 text-default-400"
              size="sm"
              variant="light"
              onPress={() => {
                console.log("Edit button pressed");
                openAddNewStudentModal("single", "edit", student);
              }}
            />
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = React.useCallback(() => {
    if (page < studentsData?.totalPages) {
      setPage(page + 1);
    }
  }, [page, studentsData?.totalPages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newRowsPerPage = Number(e.target.value);
      setRowsPerPage(newRowsPerPage);
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const openAddNewStudentModal = (
    type: string,
    mode: "edit" | "create",
    student?: any
  ) => {
    // open the model to add payment
    dispatch(
      currentModal({
        modal_name: "Add New Student",
        modal_id: ModalIdList.ADD_NEW_STUDENT_MODAL,
        data: {
          type,
          mode: mode ?? "create",
          student,
        },
      })
    );
  };

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            classNames={{
              input: "!text-[16px]",
            }}
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown backdrop="blur">
              <DropdownTrigger>
                <Button
                  color="primary"
                  endContent={<IconList.PlusIcon className="h-4" />}
                >
                  Add New
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Static Actions">
                <DropdownItem
                  onPress={() => {
                    openAddNewStudentModal("bulk", "create");
                  }}
                  key="bulk-upload"
                >
                  Bulk Upload
                </DropdownItem>
                <DropdownItem
                  onPress={() => {
                    openAddNewStudentModal("single", "create");
                  }}
                  key="single-upload"
                >
                  Single Upload
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>

            {/* ========================================================== */}
            {/* DOWNLOAD BUTTON */}

            <Button
              isIconOnly
              className="bg-neutral-light-100"
              onPress={() => {
                const link = document.createElement("a");
                link.href = `${API_PREFIX.STUDENT}/download`;
                link.setAttribute("target", "_blank");
                link.setAttribute("download", "students.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <IconList.ArrowDownTrayIcon className="h-5 text-neutral-light-800" />
            </Button>

            {/* ========================================================== */}
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {LeadTableColumnsData.map((column) => (
                  <DropdownItem key={column?.uid} className="capitalize">
                    {capitalize(column?.name)}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {studentsData?.totalCounts ?? 0} students
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
              value={rowsPerPage}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onSearchChange,
    onRowsPerPageChange,
    studentsData?.totalCounts,
    rowsPerPage,
    hasSearchFilter,
    selectedList,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={studentsData?.totalPages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={page === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={page === studentsData?.totalPages}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    studentsData?.totalPages,
    onPreviousPage,
    onNextPage,
    hasSearchFilter,
  ]);

  // jsx
  return (
    <>
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        topContent={topContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[65vh]",
          thead: "-top-4",
        }}
        sortDescriptor={sortDescriptor}
        topContentPlacement="outside"
        onSelectionChange={(e: any) => {
          setSelectedKeys(e);
          // Array.from() iterates over "e" and adds each of its elements to a new array. This is the case here that we are dealing with,
          // where "e" is a Set. Each value from the Set is added to the new array, maintaining the insertion order.
          const newArray: string[] = Array.from(e);
          // this state is important because while making API request we need to send the list of ID's which has to move to top
          setSelectedList(e === "all" ? ["all"] : newArray);
        }}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column: any) => (
            <TableColumn
              key={column?.uid || Math.random()}
              align={column?.uid === "actions" ? "center" : "start"}
              allowsSorting={column?.sortable}
            >
              {column?.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody
          emptyContent={"No Imported Medicine request found"}
          items={sortedItems?.map((item, index) => ({
            ...item,
            sl_no: (page - 1) * rowsPerPage + index + 1,
          }))}
        >
          {(item) => (
            <TableRow key={item?._id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
}
