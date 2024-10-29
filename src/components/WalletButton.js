import React, { useState, useEffect } from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'
import { Button } from "./ui/wallet-button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./ui/dropdown-menu"

const radioItemStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: '8px 12px',
  cursor: 'pointer',
  position: 'relative',
  paddingLeft: '28px', // Make room for the circle
};

const circleStyle = {
  content: '""',
  position: 'absolute',
  left: '12px',
  top: '50%',
  transform: 'translateY(-50%)',
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  border: '1px solid #808080',
};

const selectedCircleStyle = {
  ...circleStyle,
  backgroundColor: '#808080',
};

const labelContainerStyle = {
  display: 'flex',
  alignItems: 'center',
};

const accountTypeStyle = {
  fontWeight: 'bold',
  marginRight: '4px',
};

const fetchWalletButtonData = async () => {
  try {
    const response = await fetch('https://25c85181-1efa-49ba-9bde-83ee0686dcd2-00-3t5l3nvbj4pq4.sisko.replit.dev/api/wallet-button-data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wallet button data:', error);
    throw error;
  }
};

export default function WalletButton() {
  const [accountType, setAccountType] = useState("REAL");
  const [balance, setBalance] = useState(0);
  const [earnings, setEarnings] = useState(0);
  const [showBalance, setShowBalance] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchWalletButtonData();
        if (data) {
          setBalance(data.balance);
          setEarnings(data.earnings);
        }
      } catch (error) {
        console.error('Error fetching wallet data:', error);
      }
    };

    fetchData(); // Initial fetch
    const interval = setInterval(fetchData, 5000); // Fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const getTextColor = (type) => {
    return type === "REAL" ? '#F0B90B' : '#03A66D';
  };

  const standardTextStyle = {
    color: '#808080',
    fontWeight: '300',
    fontSize: '0.8em',
    marginLeft: '4px'
  };

  const formatNumberToIndian = (num) => {
    const x = num.toString().split('.');
    let x1 = x[0];
    const x2 = x.length > 1 ? '.' + x[1] : '';
    const lastThree = x1.substring(x1.length - 3);
    const otherNumbers = x1.substring(0, x1.length - 3);
    if (otherNumbers !== '') {
      x1 = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree;
    }
    return x1 + x2;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button style={{
          backgroundColor: '#1E2329',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '8px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: '160px', // Increased width
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          cursor: 'pointer',
          outline: 'none',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          fontSize: '0.8rem',
        }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '4px',
            }}>
              <span style={{ color: getTextColor(accountType), fontWeight: 'bold' }}>
                {accountType}
              </span>
              <span style={standardTextStyle}>Standard</span>
            </div>
            <span style={{
              color: 'white',
              fontSize: '0.875rem',
              paddingTop: '1px',
            }}>
              {showBalance ? `${formatNumberToIndian(balance)} INR` : '******'}
            </span>
          </div>
          <ChevronDown className="h-4 w-4 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent style={{
        backgroundColor: '#1E2329',
        color: 'white',
        padding: '16px',
        borderRadius: '8px',
        marginTop: '8px',
        width: '250px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
          <div>
            <span style={{ fontWeight: 'bold', color: getTextColor(accountType) }}>{accountType}</span>
            <span style={standardTextStyle}>Standard</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div
              style={{
                width: '40px',
                height: '20px',
                backgroundColor: '#3a3a3a',
                borderRadius: '10px',
                position: 'relative',
                cursor: 'pointer',
              }}
              onClick={() => setShowBalance(!showBalance)}
            >
              <div
                style={{
                  width: '16px',
                  height: '16px',
                  backgroundColor: '#007bff',
                  borderRadius: '50%',
                  position: 'absolute',
                  top: '2px',
                  transition: 'left 0.2s',
                  left: showBalance ? '22px' : '2px',
                }}
              />
            </div>
          </div>
        </div>
        <div style={{ marginTop: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#808080' }}>Balance</span>
            <span>{showBalance ? `${formatNumberToIndian(balance)} INR` : '******'}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#808080' }}>Your Earnings</span>
            <span>{showBalance ? `${formatNumberToIndian(earnings)} INR` : '******'}</span>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <Button 
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid #4b5563', 
              color: 'white', 
              padding: '8px',
              transition: 'background-color 0.3s, color 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563';
              e.currentTarget.style.color = 'black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
            onClick={() => window.open('https://rzp.io/rzp/7pAnhBYl', '_blank')}
          >
            Deposit
          </Button>
          <Button 
            style={{ 
              backgroundColor: 'transparent', 
              border: '1px solid #4b5563', 
              color: 'white', 
              padding: '8px',
              transition: 'background-color 0.3s, color 0.3s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#4b5563';
              e.currentTarget.style.color = 'black';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = 'white';
            }}
          >
            Withdraw
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
