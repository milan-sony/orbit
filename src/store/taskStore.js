import { create } from "zustand";
import { deleteTasks, getAllTasks, setTasks, updateTasks } from "../utils/api";

export const taskStore = create((set, get) => ({
    tasks: [],
    isSettingTask: false,
    isGettingTask: false,

    // Create task
    createTask: async (taskData) => {
        set({ isSettingTask: true });
        try {
            const setTaskResponse = await setTasks(taskData);
            console.log("setTaskResponse: ", setTaskResponse);

            if (setTaskResponse?.status === 201) {
                alert(setTaskResponse?.message);
                // Refetch all tasks after create
                await get().getAllTasks();
            } else {
                alert(setTaskResponse?.message);
            }
        } catch (error) {
            console.error("Error creating the task: ", error);
        } finally {
            set({ isSettingTask: false });
        }
    },

    // Get all tasks
    getAllTasks: async () => {
        set({ isGettingTask: true });
        try {
            const getAllTasksResponse = await getAllTasks();
            console.log("getAllTasksResponse: ", getAllTasksResponse);

            if (getAllTasksResponse?.status === 200) {
                set({ tasks: getAllTasksResponse?.data });
            } else {
                alert(getAllTasksResponse?.message);
            }
        } catch (error) {
            console.error("Error fetching the tasks: ", error);
        } finally {
            set({ isGettingTask: false });
        }
    },

    // Update a task
    updateTask: async (taskId, task) => {
        set({ isSettingTask: true });
        try {
            console.log(`taskId: ${taskId}, task${task.task} `)
            const updateTaskparams = {
                taskId,
                task: task?.task,
                priority: task?.priority
            }
            const updateTaskResponse = await updateTasks(updateTaskparams);

            if (updateTaskResponse?.status === 201) {
                alert(updateTaskResponse?.message);
                // Refetch all tasks after create
                await get().getAllTasks();
            }
        } catch (error) {
            console.error("Error fetching the tasks: ", error);
        } finally {
            set({ isSettingTask: false })
        }
    },

    // Delete a task
    deleteTask: async (taskId) => {
        set({ isGettingTask: true });
        try {
            const deleteTaskResponse = await deleteTasks(taskId);
            if (deleteTaskResponse?.status === 200) {
                alert(deleteTaskResponse?.message);
                // Refetch all tasks after delete
                await get().getAllTasks();
            } else {
                alert(deleteTaskResponse?.message);
            }
        } catch (error) {
            console.error("Error deleting the task: ", error);
        } finally {
            set({ isGettingTask: false });
        }
    }
}));
