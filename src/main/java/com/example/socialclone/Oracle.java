package com.example.socialclone;
import java.sql.*;
import java.util.ArrayList;

public class Oracle {

    public static ArrayList<ArrayList<String>> Query(String SQLString)
    {
        ArrayList<ArrayList<String>> rows = new ArrayList<ArrayList<String>>();
        try{
            //step1 load the driver class
            Class.forName("oracle.jdbc.driver.OracleDriver");

            //step2 create  the connection object
            Connection con=DriverManager.getConnection(
                    "jdbc:oracle:thin:@localhost:1521:sc","john","pudong");

            //step3 create the statement object
            Statement stmt=con.createStatement();

            //step4 execute query
            ResultSet rs=stmt.executeQuery(SQLString);
            ResultSetMetaData rsmd = rs.getMetaData();
            int cc = rsmd.getColumnCount();
            while(rs.next()){
                ArrayList<String> row = new ArrayList<String>();
                for (int i = 1; i < cc + 1; i++){
                    String col = rs.getString(i);
                    row.add(col);
                }
                rows.add(row);
            }

            //step5 close the connection object
            con.close();
        }catch(Exception e){
            System.out.println(e);
        }
        return rows;
    }
}

