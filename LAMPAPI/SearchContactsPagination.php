<?php

	$inData = getRequestInfo();
	$resultsPerPage = $inData["ResultsPerPage"];
	$pageNumber = $inData["PageNumber"];
	$searchResults = "";
	$searchCount = 0;
	$totalPages = 0;
	$totalRecords = 0;

	$conn = new mysqli("localhost", "TheBeast", "WeLoveCOP4331", "COP4331");

	if ($conn->connect_error) 
	{
		returnWithError( $conn->connect_error );
	} 
	else
	{
		$stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email, ContactID FROM Contacts WHERE UserID = ? AND (CONCAT(FirstName,' ', LastName) LIKE ? OR Phone LIKE ? OR Email LIKE ?)");
		$Search = "%". $inData["Search"] . "%";
		$stmt->bind_param("ssss", $inData["UserID"], $Search, $Search, $Search);
		$stmt->execute();
		$result = $stmt->get_result();
		
		$totalRecords = mysqli_num_rows($result);
		$totalPages = ceil($totalRecords / $resultsPerPage);
		
		$startingIndex = ($pageNumber - 1) * $resultsPerPage;
		$stmt = $conn->prepare("SELECT FirstName, LastName, Phone, Email, ContactID FROM Contacts WHERE UserID = ? AND (CONCAT(FirstName,' ', LastName) LIKE ? OR Phone LIKE ? OR Email LIKE ?) LIMIT ?, ?");
		$stmt->bind_param("ssssii", $inData["UserID"], $Search, $Search, $Search, $startingIndex, $resultsPerPage);
		$stmt->execute();
		$result = $stmt->get_result();
		
		while($row = $result->fetch_assoc())
		{
			if( $searchCount > 0 )
			{
				$searchResults .= ",";
			}
			$searchCount++;
			$searchResults .= 
			'{'
				.'"FirstName":"'. $row["FirstName"] .'",'.
				'"LastName":"'. $row["LastName"] .'",'.
				'"Phone":"'. $row["Phone"] .'",'.
				'"Email":"'. $row["Email"] .'",'.
				'"ContactID":"'. $row["ContactID"].'"'.
			'}';
		}
		
		if( $searchCount == 0 )
		{
			returnWithError( "No Records Found" );
		}
		else
		{
			returnWithInfo( $searchResults, $totalPages, $totalRecords );
		}
		
		$stmt->close();
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $searchResults, $totalPages, $totalRecords )
	{
        $retValue = '{
            "results": [' . $searchResults . '],
            "totalrecords": "' . $totalRecords . '",
            "totalpages": "' . $totalPages . '",
            "error": ""
        }';

		sendResultInfoAsJson( $retValue );
	}
	
?>
