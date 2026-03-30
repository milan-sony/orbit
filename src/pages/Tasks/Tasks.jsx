import React, { useEffect, useState } from "react";
import { toast } from "sonner"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Plus, Pencil, Trash2 } from "lucide-react";

import { taskStore } from "../../store/taskStore";

function Tasks() {
    const { getAllTasks, createTask, updateTask, deleteTask, tasks } = taskStore();

    useEffect(() => {
        getAllTasks();
    }, [getAllTasks]);

    const [open, setOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState(null);

    const [formData, setFormData] = useState({
        task: "",
        priority: "",
    });

    const [filters, setFilters] = useState({
        priority: "all",
    });

    const priorityList = [
        { name: "Low", value: "low" },
        { name: "Medium", value: "medium" },
        { name: "High", value: "high" },
    ];

    const validateForm = () => {
        if (!formData.task) return toast.info("Task is required", { position: "top-center" });
        if (!formData.priority) return toast.info("Priority is required", { position: "top-center" });
        return true;
    };

    // Create / Update submit
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        if (isEdit) {
            updateTask(selectedTaskId, formData);
        } else {
            createTask(formData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({ task: "", priority: "" });
        setIsEdit(false);
        setSelectedTaskId(null);
        setOpen(false);
    };

    // Edit handler
    const handleEdit = (task) => {
        setFormData({
            task: task.task,
            priority: task.priority,
        });
        setSelectedTaskId(task._id);
        setIsEdit(true);
        setOpen(true);
    };

    // Delete handler
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this task?")) {
            deleteTask(id);
        }
    };

    // Filter logic
    const filteredTasks = tasks.filter((task) => {
        return filters.priority === "all" || task.priority === filters.priority;
    });

    return (
        <div className="px-4 py-6 max-w-2xl mx-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Tasks</h2>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button
                            size="sm"
                            onClick={() => {
                                setIsEdit(false);
                                setFormData({ task: "", priority: "" });
                            }}
                        >
                            <Plus size={16} /> Add
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {isEdit ? "Edit Task" : "Create Task"}
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Task */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Task</label>
                                <Input
                                    value={formData.task}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            task: e.target.value,
                                        })
                                    }
                                />
                            </div>

                            {/* Priority */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Priority</label>
                                <Select
                                    value={formData.priority}
                                    onValueChange={(value) =>
                                        setFormData((prev) => ({
                                            ...prev,
                                            priority: value,
                                        }))
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select priority" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Priority</SelectLabel>
                                            {priorityList.map((p) => (
                                                <SelectItem key={p.value} value={p.value}>
                                                    {p.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button type="submit" className="w-full">
                                {isEdit ? "Update Task" : "Save Task"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filters */}
            <div className="flex gap-3 mb-4">
                <Select
                    value={filters.priority}
                    onValueChange={(value) =>
                        setFilters({ priority: value })
                    }
                >
                    <SelectTrigger className="w-full sm:w-1/2">
                        <SelectValue placeholder="Filter" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        {priorityList.map((p) => (
                            <SelectItem key={p.value} value={p.value}>
                                {p.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            {/* Task List */}
            <div className="space-y-3">
                {filteredTasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                        No tasks found.
                    </p>
                ) : (
                    filteredTasks.map((task) => (
                        <Card key={task._id}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div>
                                    <p className="font-medium">{task.task}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {task.priority}
                                    </p>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => handleEdit(task)}
                                    >
                                        <Pencil size={16} />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={() =>
                                            handleDelete(task._id)
                                        }
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}

export default Tasks;