package com.enigmacamp.api.holasend.configs.exporter;

import com.enigmacamp.api.holasend.entities.Task;
import com.enigmacamp.api.holasend.models.excel.TaskReportModel;

import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class ReportModelMapper {

    private static String convertDateOrTime(String input, String replacement) {
        input = input.replaceAll("-", replacement);
        return input;
    }

    private static String dateFormat(String formattedDateTime) {
        String date = formattedDateTime.substring(0, 10);
        date = convertDateOrTime(date, "/");
        String time = formattedDateTime.substring(11, 19);
        time = convertDateOrTime(time, ":");
        formattedDateTime = date + " " + time;
        return formattedDateTime;
    }

    public static List<TaskReportModel> convert(List<Task> taskList) {
        List<TaskReportModel> modelList = new ArrayList<>();

        if (taskList.isEmpty()) {
            TaskReportModel model = new TaskReportModel(
                    "","","","","","","","","","",""
            );
            modelList.add(model);
            return modelList;
        }
        taskList.forEach(
                task -> {
                    TaskReportModel model = new TaskReportModel();
                    model.setDestination(task.getDestination().getName());
                    model.setAddress(task.getDestination().getAddress());
                    model.setRequestBy(
                            task.getRequestBy().getUserDetails().getFirstName() +
                                    " " +
                                    task.getRequestBy().getUserDetails().getLastName());

                    if (task.getCourier() != null) {
                        model.setCourier(
                                task.getCourier().getUserDetails().getFirstName() +
                                        " " +
                                        task.getCourier().getUserDetails().getLastName());
                    } else {
                        model.setCourier("");
                    }

                    if (task.getPickUpTime() != null) {
                        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
                        String formattedDateTime = task.getPickUpTime().format(formatter);
                        formattedDateTime = dateFormat(formattedDateTime);
                        model.setPickUpTime(formattedDateTime);
                    } else {
                        model.setPickUpTime("");
                    }

                    if (task.getDeliveredTime() != null) {
                        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
                        String formattedDateTime = task.getDeliveredTime().format(formatter);
                        formattedDateTime = dateFormat(formattedDateTime);
                        model.setDeliveredTime(formattedDateTime);
                    } else {
                        model.setDeliveredTime("");
                    }

                    if (task.getCourierActivity() != null) {
                        DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
                        String formattedDateTime = "";
                        if (task.getCourierActivity().getReturnTime() != null) {
                            formattedDateTime = task.getCourierActivity().getReturnTime().format(formatter);
                            formattedDateTime = dateFormat(formattedDateTime);
                        }
                        model.setReturnTime(formattedDateTime);
                    } else {
                        model.setReturnTime("");
                    }

                    model.setStatus(task.getStatus().toString());
                    model.setPriority(task.getPriority().toString());
                    model.setNotes(task.getNotes());

                    DateTimeFormatter formatter = DateTimeFormatter.ISO_DATE_TIME;
                    String formattedDateTime = task.getCreateDate().format(formatter);
                    formattedDateTime = dateFormat(formattedDateTime);
                    model.setCreateDate(formattedDateTime);
                    modelList.add(model);
                }
        );

        return modelList;
    }
}
