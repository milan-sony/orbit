import React, { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

    const getPriorityBadge = (priority) => {
        switch (priority) {
            case "low":
                return <Badge variant="secondary">Low</Badge>;
            case "medium":
                return <Badge className="bg-yellow-500/10 text-yellow-600">Medium</Badge>;
            case "high":
                return <Badge variant="destructive">High</Badge>;
            default:
                return <Badge>{priority}</Badge>;
        }
    };

    const validateForm = () => {
        if (!formData.task)
            return toast.info("Task is required", { position: "top-center" });
        if (!formData.priority)
            return toast.info("Priority is required", { position: "top-center" });
        return true;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        isEdit
            ? updateTask(selectedTaskId, formData)
            : createTask(formData);

        resetForm();
    };

    const resetForm = () => {
        setFormData({ task: "", priority: "" });
        setIsEdit(false);
        setSelectedTaskId(null);
        setOpen(false);
    };

    const handleEdit = (task) => {
        setFormData({ task: task.task, priority: task.priority });
        setSelectedTaskId(task._id);
        setIsEdit(true);
        setOpen(true);
    };

    const filteredTasks = tasks.filter(
        (task) =>
            filters.priority === "all" || task.priority === filters.priority
    );

    return (
        <div className="max-w-xl mx-auto px-4 py-6 space-y-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-lg sm:text-xl font-semibold">Tasks</h2>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-1" /> Add
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle>
                                {isEdit ? "Edit Task" : "Create Task"}
                            </DialogTitle>
                        </DialogHeader>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <Input
                                placeholder="Enter task..."
                                value={formData.task}
                                onChange={(e) =>
                                    setFormData({ ...formData, task: e.target.value })
                                }
                            />

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
                                    {priorityList.map((p) => (
                                        <SelectItem key={p.value} value={p.value}>
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <Button type="submit" className="w-full">
                                {isEdit ? "Update Task" : "Save Task"}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Filter */}
            <Select
                value={filters.priority}
                onValueChange={(value) => setFilters({ priority: value })}
            >
                <SelectTrigger className="w-full sm:w-48">
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

            {/* Task List */}
            <div className="space-y-2">
                {filteredTasks.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-6">
                        No tasks yet
                    </p>
                ) : (
                    filteredTasks.map((task) => (
                        <Card
                            key={task._id}
                            className="hover:shadow-md transition-all"
                        >
                            <CardContent className="flex items-center justify-between gap-3">

                                {/* Left */}
                                <div className="flex flex-col">
                                    <p className="text-sm font-medium">{task.task}</p>
                                    <div className="mt-1">
                                        {getPriorityBadge(task.priority)}
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-1">
                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() => handleEdit(task)}
                                    >
                                        <Pencil className="w-4 h-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="ghost"
                                        onClick={() =>
                                            toast("Do you want to delete this task?", {
                                                position: "top-center",
                                                action: {
                                                    label: "Delete",
                                                    onClick: () => deleteTask(task._id),
                                                },
                                            })
                                        }
                                    >
                                        <Trash2 className="w-4 h-4" />
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