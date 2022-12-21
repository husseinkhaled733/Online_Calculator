package com.example.calc.service;

import org.springframework.stereotype.Service;

@Service
public class Solver {
    public String solve(String expression){
        expression=expression.replaceAll("\"","");
        String operation="";
        boolean flag=false;
        String str1="";
        String str2="";
        String result="";
        double first=0;
        double second=0;
        for (int i=0;i<expression.length();i++){
            if(expression.charAt(i)>='a'&&expression.charAt(i)<='z'){
                operation+=expression.charAt(i);
                flag=true;
            }
            else if (!flag){
                str1+=expression.charAt(i);
            }
            else {
                str2+=expression.charAt(i);
            }
        }
        if(!str1.equals("")){
            try {
                first=Double.parseDouble(str1);
            }
            catch (Exception e){
                return null;
            }
        }
        if(!str2.equals("")){
            try {
                second=Double.parseDouble(str2);
            }
            catch (Exception e){
                return null;
            }
        }
        switch (operation) {
            case "plus" -> {
                double sum = first + second;
                result = Double.toString(sum);
            }
            case "minus" -> {
                double minus = first - second;
                result = Double.toString(minus);
            }
            case "times" -> {
                double times = first * second;
                result = Double.toString(times);
            }
            case "divide" -> {
                    if (second == 0) {
                        return null;
                    }
                    double divide = first / second;
                    result = Double.toString(divide);
            }
            case "root" -> {
                if (second < 0) {
                    return null;
                }

                double root = Math.sqrt(second);
                result = Double.toString(root);
            }
            case "divideby" -> {
                if(str2.equals("")){
                    if(str1.equals("")){
                        return null;
                    }
                    else{
                        result=Double.toString(1.0/first);
                    }
                }
                else{
                    if (second == 0) {
                        return null;
                    }
                    double divideby = 1.0 / second;
                    result = Double.toString(divideby);
                }
            }
            case "pow" -> {
                if(str2.equals("")){
                    if(str1.equals("")){
                        result="0";
                    }
                    else{
                        result=Double.toString(first*first);
                    }
                }
                else {
                    double pow = second*second;
                    result = Double.toString(pow);
                }
            }
            case "percent" -> {
                if(str2.equals("")){
                    if(str1.equals("")){
                        result="0";
                    }
                    else{
                        result=Double.toString(first*(first/100.0));
                    }
                }
                else{
                    double percent =(second/100.0);
                    if(!str1.equals("")){
                        percent*=first;
                    }
                    result = Double.toString(percent);
                }
            }
            case "negate" -> {
                if(str2.equals("")){
                    if(str1.equals("")){
                        result="0";
                    }
                    else{
                        result=Double.toString(first*-1);
                    }
                }
                else{
                    double ne = second*-1;
                    result = Double.toString(ne);
                }
            }
            default -> {
                result=Double.toString(first);
            }
        }
        return result;
    }
}
